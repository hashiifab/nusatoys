import { serveStatic } from 'hono/bun'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import lincah from './lincah'
import xendit from './xendit'

// Buat instance app
export const app = new Hono()

// Enable CORS for client requests
app.use('/*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// API route
app.get('/api', (c) => c.text('Hello from API!'))

// Mount lincah routes
app.route('/api/lincah', lincah)

// Mount xendit routes
app.route('/api/xendit', xendit)

// Serve static files (frontend build)
app.use('*', serveStatic({ root: './client/dist' }))

// (opsional) kalau kamu juga butuh default export untuk kompatibilitas
export default app
