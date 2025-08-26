import { serveStatic } from 'hono/bun'
import { Hono } from 'hono'

// Buat instance app
export const app = new Hono()

// API route
app.get('/api', (c) => c.text('Hello from API!'))

// Serve static files (frontend build)
app.use('*', serveStatic({ root: './client/dist' }))

// (opsional) kalau kamu juga butuh default export untuk kompatibilitas
export default app
