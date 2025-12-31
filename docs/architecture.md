# Architecture And Design
## High-level request flow

A typical request in Vyntrix follows this path:
```
Client → Express Router → Global Middleware → Route Middleware → Controller → Mongoose Model → MongoDB → Response
```
All API routes are mounted under a versioned prefix `(/api/v1)`, making future API evolution possible without breaking existing clients.

## Application entry point

The application is initialized in `app.js`. This file is responsible for:
- Creating the Express application
- Loading environment variables
- Registering global middleware
- Connecting to MongoDB
- Mounting API routes
- Registering the centralized error-handling middleware

`app.js` acts as the orchestration layer and contains no business logic.

## Routing layer
Routes are defined inside the `routes/` directory and grouped by domain:

- Authentication routes
- User-related routes
- Subscription-related routes

Routes are responsible only for:
- Defining HTTP methods and paths
- Attaching relevant middleware
- Forwarding requests to controllers

They __do not__ contain validation rules, database logic, or business decisions.

All routes are mounted using the `/api/v1` prefix to support API versioning.

## Middleware layer

Middleware plays a central role in Vyntrix and is used to enforce cross-cutting concerns.

__Global middleware includes:__
- Arcjet protection (shielding, bot detection, rate limiting)
- Request parsing and basic validation

__Route-level middleware includes:__
- Authentication middleware, which verifies JWTs and attaches the authenticated user to `req.user`
- Authorization middleware, which restricts access to certain routes based on user roles (e.g., admin-only endpoints)
- Request validation middleware to ensure incoming data meets required constraints

Middleware ensures that controllers receive only valid, authenticated, and authorized requests.

## Authentication and authorization

Vyntrix uses __JWT-based__ authentication.
- JWTs are sent via the `Authorization: Bearer <token> HTTP header`
- Tokens are verified using a shared secret
- No refresh token mechanism is implemented as of now

Password hashing is handled during user registration inside the authentication controller.

Authorization is role-based:
- Regular users can only access their own resources
- Certain routes (such as retrieving all users) are restricted to admin users

Ownership checks are enforced at the controller level to prevent unauthorized access to user-specific data.

## Controller layer

Controllers act as the bridge between HTTP requests and the data layer.

Their responsibilities include:
- Parsing request data
- Performing ownership and authorization checks
- Calling Mongoose models
- Returning formatted HTTP responses

Controllers do not directly format error responses. Instead, they pass errors to the centralized error handler using `next(error)`.

Business logic is intentionally kept minimal in controllers, with data integrity rules enforced at the model level.

## Data modeling and business rules

Vyntrix uses Mongoose for schema definition and database interaction.

The User model defines:
- Core identity fields
- Authentication-related data
- Role-based access control

The Subscription model represents the core domain of the application and includes:
- Subscription metadata (name, category, price, frequency)
- Lifecycle fields (start date, renewal date, status)
- A required reference to the owning user

Key business rules are enforced directly in the model:
- Renewal dates are automatically calculated when missing
- Subscription status is automatically updated when the renewal date has passed

By enforcing these rules at the schema level, Vyntrix ensures consistency regardless of where or how data is created or modified.

## Database layer

MongoDB Atlas is used as the primary data store.

Database connection logic is isolated in the `database/` directory, keeping configuration separate from application logic.

Indexes are applied where appropriate (e.g., user references on subscriptions) to improve query performance.

## Error handling

Vyntrix uses a centralized error-handling middleware to format all error responses consistently.

Any error thrown or passed via `next(error)` is caught by this middleware, which:
- Normalizes error messages
- Sets appropriate HTTP status codes
- Returns predictable error response structures

This approach avoids duplicated error-handling logic across controllers and improves debuggability.

## Security considerations

Security is treated as a first-class concern in Vyntrix.
- Arcjet provides protection against common attack patterns and abusive traffic
- JWT authentication ensures stateless, scalable auth
- Schema-level validation prevents invalid data from reaching the database
- Role-based authorization restricts access to sensitive endpoints

These measures collectively ensure that only valid, authorized requests are processed.
