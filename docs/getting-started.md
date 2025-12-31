# Getting Started with Vyntrix

This guide will help you set up and run the **Vyntrix Subscription Tracker API** locally for development.



## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm**
- A **MongoDB Atlas** account
- An **Arcjet** account (for request protection)


## Clone the Repository

```
git clone https://github.com/Iniyaa21/Vyntrix.git
cd Vyntrix
npm install
```

## Environment Configuration

Vyntrix uses environment variables for configuration.

Create a file named `.env.development.local` in the root of the project and add the following variables.

You can use `.env.example` as a reference.

### 1. PORT
```
PORT=3000
```
- This is the port on which the server will run.
- You can use __any free port between 1024 and 65535__.
- Common choices are `3000`, `4000`, or `5000`.

### 2. NODE_ENV
```
NODE_ENV="development"
```
- This tells the application which environment it is running in.
- For local development, this should always be set to `development`.

### 3. Database Configuration (MongoDB Atlas)
```
DB_URI=<your_mongodb_atlas_connection_string_here>
```
Vyntrix uses __MongoDB Atlas__ as its database.

__Steps to get your DB URI:__
- Go to https://www.mongodb.com/atlas
- Create a free account (or log in)
- Create a new __Cluster__
- Create a database user and allow network access
- Click __Connect → Drivers__
- Copy the connection string
- Replace `<password>` with your database user password

Example:
```
DB_URI=mongodb+srv://username:password@cluster0.mongodb.net/vyntrix
```
### 4. JWT Authentication
```
JWT_SECRET=<your_jwt_secret_here>
JWT_EXPIRES_IN=7d
```
#### JWT_SECRET

- This is a secret key used to sign and verify JSON Web Tokens (JWTs).
- It can be any long, random string.
- Example:
```
JWT_SECRET=my-super-secret-jwt-key
```

> Tip: In real production apps, this should be a strong, unpredictable value.

#### JWT_EXPIRES_IN

- Controls how long a JWT remains valid.
- Common values:
    - `1d` → 1 day
    - `7d` → 7 days
    - `30d` → 30 days

### 5. Arcjet Configuration
```
ARCJET_KEY=<your_arcjet_key_here>
ARCJET_ENV="development"
```

Vyntrix uses __Arcjet__ to protect APIs against abuse (rate limiting, bot protection, etc.).

__Steps to get your Arcjet API key:__
- Go to https://arcjet.com
- Create an account
- Create a new project
- Copy the generated API Key
- Paste it into your `.env.development.local` file

`ARCJET_ENV` should be set to `"development"` for local usage.

## Running the Server

Once your environment variables are set, start the development server:
```
npm run dev
```

If everything is configured correctly, the server should start and listen on the port you specified.

## Next Steps

- Read the [Architecture documentation](architecture.md) to understand the project structure.

- Explore the [API Documentation](api.md) to see available endpoints.
