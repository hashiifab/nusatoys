import { Hono } from "hono";
import { Invoice as XenditInvoiceClient } from "xendit-node";
import { createClient } from '@supabase/supabase-js';

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false
  }
});

// Init Xendit client
const xenditInvoice = new XenditInvoiceClient({
  secretKey: process.env.XENDIT_SECRET_KEY || "",
});

// Admin authentication middleware
const adminAuthMiddleware = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.user_role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    // Add user info to context
    c.set('user', user);
    await next();
  } catch (error) {
    console.error('Admin auth error:', error);
    return c.json({ error: 'Authentication failed' }, 401);
  }
};

// Generate sequential invoice ID
async function makeInvoiceId(): Promise<string> {
  const { data, error } = await supabase
    .from('payments')
    .select('invoice_id')
    .order('invoice_id', { ascending: false })
    .limit(1);
  
  let nextId = 1;
  if (data && Array.isArray(data) && data.length > 0 && data[0]?.invoice_id) {
    const lastId = data[0].invoice_id;
    const match = lastId.match(/(\d+)$/);
    if (match) {
      nextId = parseInt(match[1]) + 1;
    }
  }
  
  return `nustoys-${nextId}`;
}

// Buat payment / invoice
app.post("/payments", async (c) => {
  try {
    const body = await c.req.json();
    const {
      product,
      amount,
      qty,
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress
    } = body;

    if (!product || !amount || !qty) {
      return c.json(
        { success: false, error: "Harus isi product, amount, qty" },
        400
      );
    }

    const invoiceId = await makeInvoiceId();

    const invoice = await xenditInvoice.createInvoice({
      data: {
        externalId: invoiceId,
        amount,
        description: `Pembelian ${product} (${qty} item)`,
        invoiceDuration: 86400, // 1 hari
        currency: "IDR",
        customer: {
          givenNames: buyerName,
          email: buyerEmail,
          mobileNumber: buyerPhone,
        },
        customerNotificationPreference: {
          invoiceCreated: ["email", "sms"],
          invoiceReminder: ["email", "sms"],
          invoicePaid: ["email", "sms"],
        },
        successRedirectUrl: `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/cart?status=success`,
        failureRedirectUrl: `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/cart?status=failed`,
      },
    });

    // Store payment record in database
    const paymentRecord = {
      invoice_id: invoiceId,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      buyer_phone: buyerPhone,
      amount,
      items: [{ product, quantity: qty }],
      shipping_address: shippingAddress || {},
      status: 'pending',
      invoice_url: invoice.invoiceUrl
    };

    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert([paymentRecord])
      .select()
      .single();

    if (paymentError) {
      console.error('Error saving payment to database:', paymentError);
      throw new Error('Failed to save payment record');
    }

    return c.json({
      success: true,
      data: {
        invoice_id: invoiceId,
        invoice_url: invoice.invoiceUrl,
        amount,
        product,
        qty,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, error: "Gagal membuat pembayaran" }, 500);
  }
});

// Webhook dari Xendit
app.post("/webhooks/xendit", async (c) => {
  try {
    const callbackToken = c.req.header("x-callback-token");
    if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return c.json({ success: false, error: "Token tidak valid" }, 401);
    }

    const data = await c.req.json();
    console.log("Webhook Xendit:", data);
    
    // Update payment status in database based on webhook
    const { data: payment, error: updateError } = await supabase
      .from('payments')
      .update({
        status: data.status.toLowerCase()
      })
      .eq('invoice_id', data.external_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating payment status:', updateError);
      throw new Error('Failed to update payment status');
    }

    return c.json({ success: true });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, error: "Webhook gagal diproses" }, 500);
  }
});

interface Payment {
  id: string;
  status: string;
  invoice_id: string;
  amount: number;
  product: string;
  qty: number;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
}



// Get all payments (admin only)
app.get('/payments', adminAuthMiddleware, async (c) => {
  try {
    const status = c.req.query('status');
    
    let query = supabase.from('payments').select('*');
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data: payments, error } = await query.order('invoice_id', { ascending: false });
    
    if (error) {
      console.error('Error fetching payments:', error);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json(payments || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all orders (filtered PAID payments)
app.get('/payments/orders', adminAuthMiddleware, async (c) => {
  try {
    const { data: orders, error } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'paid')
      .order('invoice_id', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json(orders || []);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get payment by ID
app.get('/payments/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('invoice_id', id)
      .single();
    
    if (error || !payment) {
      return c.json({ error: 'Payment not found' }, 404);
    }
    
    return c.json(payment);
  } catch (error) {
    console.error('Unexpected error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});



export default app;
