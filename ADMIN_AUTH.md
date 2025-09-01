# Admin Authentication Implementation

## Overview
This document explains the admin authentication system implemented for protecting admin-only API endpoints.

## Protected Endpoints

### Products API (`/api/products`)
- **GET /** - Public (no authentication required)
- **POST /** - Admin only
- **PUT /:id** - Admin only
- **DELETE /:id** - Admin only

### Xendit API (`/api/xendit`)
- **GET /payments** - Admin only (payment list)
- **GET /payments/orders** - Admin only (paid orders)
- **POST /payments** - Public (customer checkout)
- **POST /webhooks/xendit** - Public (webhook from Xendit)

## Authentication Requirements

### Server-Side Middleware
The server uses a custom admin authentication middleware that:
1. Validates JWT tokens from the Authorization header
2. Verifies the user has admin role in the profiles table
3. Returns appropriate HTTP status codes (401, 403) for unauthorized access

### Client-Side Usage

#### Using the Admin API Helper
```typescript
import { adminApi } from '../lib/admin-api';

// Get all payments (admin only)
const response = await adminApi.getPayments();
if (response.error) {
  console.error('Error:', response.error);
} else {
  console.log('Payments:', response.data);
}

// Create new product (admin only)
const newProduct = {
  name: "New Toy",
  description: "A great toy",
  price: 100000,
  stock: 10,
  image_url: "https://example.com/image.jpg",
  specification: {
    weight: "500g",
    volume: {
      length: "20cm",
      width: "15cm",
      height: "10cm"
    }
  }
};
const createResponse = await adminApi.createProduct(newProduct);
```

#### Manual API Calls
```typescript
import { supabase } from '../lib/supabase';

// Get auth token
const { data: { session } } = await supabase.auth.getSession();
if (session) {
  const response = await fetch('/api/products', {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
}
```

## Error Handling

### HTTP Status Codes
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Valid token but insufficient permissions (not admin)
- **500 Internal Server Error**: Server-side errors

### Error Response Format
```json
{
  "error": "Error message description"
}
```

## Setup Requirements

### Database Schema
Ensure the `profiles` table has a `user_role` column with values:
- `admin` - Full access to protected endpoints
- `customer` - Regular user access

### Environment Variables
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Testing Admin Access

### Test with Admin User
1. Login with admin credentials via `/admin/login`
2. Use the obtained session token in API calls
3. All admin endpoints should return data successfully

### Test with Non-Admin User
1. Login with regular user credentials
2. Attempt to access admin endpoints
3. Should receive 403 Forbidden response

### Test without Authentication
1. Make API calls without Authorization header
2. Should receive 401 Unauthorized response