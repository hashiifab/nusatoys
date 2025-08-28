import { Hono } from 'hono';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://swaxfxjsbqgrjlgdnabl.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3YXhmeGpzYnFncmpsZ2RuYWJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjI3OTEyNiwiZXhwIjoyMDcxODU1MTI2fQ.d1C9Ax9shdvoFuvVttBeRkohdjhBuMsyuabsjxMYPGA';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false
  }
});

// Product schema
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  image_url: z.string().url().optional(),
  specification: z.object({
    weight: z.string().min(1, 'Weight is required'),
    volume: z.object({
      length: z.string().min(1, 'Length is required'),
      width: z.string().min(1, 'Width is required'),
      height: z.string().min(1, 'Height is required'),
    }).optional(),
  }),
});

const app = new Hono();

// Get all products
app.get('/', async (c) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json(products);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get product by ID
app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    // Check if it's a UUID format (for backward compatibility)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    let productQuery;
    if (isUUID) {
      productQuery = supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
    } else {
      // Treat as slug - convert slug back to name by replacing hyphens with spaces
      const name = id.replace(/-/g, ' ');
      productQuery = supabase
        .from('products')
        .select('*')
        .ilike('name', name)
        .single();
    }

    const { data: product, error } = await productQuery;

    if (error) {
      console.error('Error fetching product:', error);
      return c.json({ error: error.message }, 500);
    }

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    return c.json(product);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create new product
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = productSchema.parse(body);

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name: validatedData.name,
          description: validatedData.description,
          price: validatedData.price,
          stock: validatedData.stock,
          image_url: validatedData.image_url,
          specification: validatedData.specification,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json(product, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update product
app.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validatedData = productSchema.parse(body);

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        stock: validatedData.stock,
        image_url: validatedData.image_url,
        specification: validatedData.specification,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return c.json({ error: error.message }, 500);
    }

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    return c.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete product
app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Search products
app.get('/search', async (c) => {
  try {
    const query = c.req.query('q');
    const category = c.req.query('category');
    const minPrice = c.req.query('minPrice');
    const maxPrice = c.req.query('maxPrice');

    let supabaseQuery = supabase.from('products').select('*');

    if (query) {
      supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category);
    }

    if (minPrice) {
      supabaseQuery = supabaseQuery.gte('price', parseInt(minPrice));
    }

    if (maxPrice) {
      supabaseQuery = supabaseQuery.lte('price', parseInt(maxPrice));
    }

    const { data: products, error } = await supabaseQuery;

    if (error) {
      console.error('Error searching products:', error);
      return c.json({ error: error.message }, 500);
    }

    return c.json(products);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;