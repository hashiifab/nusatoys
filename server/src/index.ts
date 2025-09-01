import { serveStatic } from 'hono/bun'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import lincah from './lincah'
import xendit from './xendit'
import products from './products'

// Buat instance app
export const app = new Hono()

// Enable CORS for client requests (optional for single origin deployment)
// Keep for development flexibility
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://safety-nusatoys.rl5j77.easypanel.host', '*', ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', '*'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposeHeaders: ['Content-Length', 'Content-Type']
}))

// API route
app.get('/api', (c) => c.text('Hello from API!'))

// Mount lincah routes
app.route('/api/lincah', lincah)

// Mount xendit routes
app.route('/api/xendit', xendit)

// Mount products routes
app.route('/api/products', products)

// API routes should be defined before static file handling

// Serve static assets (CSS, JS, images)
// Use absolute paths for static files to ensure they're found correctly
const staticPath = process.cwd() + '/static';
app.use('/assets/*', serveStatic({ root: staticPath, rewriteRequestPath: (path) => path.replace(/^\/assets/, '') }))
app.use('/vite.svg', serveStatic({ root: staticPath }))

// Serve all static files from the static directory
app.use('/*', serveStatic({ root: staticPath }))

// Explicitly handle admin routes to ensure they're properly routed to the SPA
app.get('/admin/*', async (c) => {
  console.log('Admin route accessed:', c.req.path);
  return c.html(await Bun.file('./static/index.html').text());
})

// Explicitly handle admin login route
app.get('/admin/login', async (c) => {
  console.log('Admin login route accessed');
  return c.html(await Bun.file('./static/index.html').text());
})

// Explicitly handle admin dashboard route
app.get('/admin/dashboard', async (c) => {
  console.log('Admin dashboard route accessed');
  return c.html(await Bun.file('./static/index.html').text());
})

// Serve index.html for all other routes (SPA support)
app.get('*', async (c) => {
  console.log('Route accessed:', c.req.path);
  return c.html(await Bun.file('./static/index.html').text());
})

const port = parseInt(process.env.PORT || '3000');

export default {
  port,
  fetch: app.fetch,
}

console.log(`🚀 Server running on port ${port}`)
