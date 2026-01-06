# API Documentation

This document describes the currently implemented API endpoints for the Vyntrix Subscription Tracker API. Only stable and functional endpoints are documented here. Additional routes will be added in the future.

## Base URL

All endpoints are prefixed with:

`/api/v1`

## Authentication

Vyntrix uses JWT-based authentication.

- JWTs are returned during sign-up and sign-in
- Authenticated requests must include the token in the HTTP header:

`Authorization: Bearer <token>`

If authentication fails, the request is rejected before reaching the controller.

## Response Format

Successful responses return appropriate HTTP status codes along with JSON data.

Error responses follow a consistent format:
```
{
  success: false,
  error: <error details>
}
```
---
## Auth Endpoints

`POST /api/v1/auth/sign-up`

Creates a new user account.

Example  request body:
```
{
  "name": "Jahoda",
  "email": "jahoda@gmail.com",
  "password": "abc123"
}
```

Response:
```
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "token": <jwt token>,
        "user": <user object>
    }
}
```

Behavior:

- Validates input
- Hashes the password
- Creates a new user
- Returns a JWT

---

`POST /api/v1/auth/sign-in`

Authenticates an existing user.

Example request body:

```
{
  "email": "jahoda@gmail.com",
  "password": "abc123"
}
```

Response:
```
{
 "success": true,
 "message": "User signed in successfully",
  "data": {
        "token": <jwt token>,
        "user": <user object>
    }
}
```

Behavior:

- Verifies credentials
- Returns a JWT

---
## User Endpoints

`GET /api/v1/users`

- Authentication: Required
- Authorization: Admin only
- Returns a list of all users in the system.
- Access rules:
    - Only users with the admin role can access this endpoint
    - A bearer token has to be included in the header
    - No request body
- Response:
```
{
  "success": true,
  "data": [
    <user-objects>
  ]
}
```

---
`GET /api/v1/users/:id`

- Authentication: Required
- Authorization:
    - The user can access their own profile
    - Admin users can access any user profile
- Returns details of a specific user
- No request body
- Response:
```
{
  "success": true,
  "data": <user-object>
}
```

---
`DELETE /api/v1/users/:id`

- Authentication: Required
- Authorization:
    - The user can delete their own profile
    - Admin users can delete any user profile
- Deleting a user also deletes all subscriptions associated with that user
- No request body
- Response:
```
{
  "success": true,
  "message": "User deleted successfully"
}
```
---
## Subscription Endpoints
`GET /api/v1/subscriptions`

- Authentication: Required 
- Authorization: Admin only
- Returns a list of all subscriptions in the system.
- Access rules:
    - Only users with the admin role can access this endpoint
    - A bearer token has to be included in the header
    - No request body

Response:
```
{
  "success": true,
  "data": [
    <subscription-objects>
    ]
}
```
---

`POST /api/v1/subscriptions`

- Authentication: Required 
- Creates a new subscription for the authenticated user.
- Bearer token must be included in request header.
- Example request body:
```
{
  "name":"Prime Video", 
  "price": 15.99, 
  "currency":"USD",
  "frequency":"monthly",
  "category":"entertainment",
  "startDate": "2025-12-26T13:50:06.032Z",
  "paymentMethod" : "Credit Card"
}
```

Response:
```
{
  "success": true,
  "message": "Subscription created successfully",
  "data": <subscription-object>
}
```
- Behavior:
    - Subscription is automatically linked to the authenticated user
    - Renewal date is auto-calculated if not provided
    - Subscription status is auto-managed based on dates
---
`GET /api/v1/subscriptions/user/:id`

- Authentication: Required
- Authorization:
    - Users can access only their own subscriptions
    - Admin users can access subscriptions for any user
    - Returns all subscriptions associated with a specific user.
- Bearer token must be included in request header.
- Response:
```
{
  "success": true,
  "data": [
    <subscription-objects>
  ]
}
```

---
`GET /api/v1/subscriptions/:id`

- Authentication: Required
- Authorization:
    - Users can access only their own subscription
    - Admin users can access subscription for any user
    - Returns the specified subscription details.
- Bearer token must be included in request header.
- Response:
```
{
  "success": true,
  "data": <subscription-object>
  
}
```
---
## Authorization Summary

- Public:
    - Sign-up
    - Sign-in
- Authenticated users:
    - Create subscriptions
    - View their own profile
    - View their own subscriptions
- Admin-only:
    - View all users
    - View any user’s subscriptions or profile

## Notes
- All protected routes require a valid JWT
- Requests failing authentication or authorization are rejected early
- Additional endpoints are planned but not yet implemented

This API documentation reflects the current state of the project and will evolve as new features are added.



