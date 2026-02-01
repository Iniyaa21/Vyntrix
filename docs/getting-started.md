# Getting Started with Vyntrix

This guide will help you set up and run the **Vyntrix Subscription Tracker API** locally for development.



## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or later recommended)
- **npm**


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

### 6. QStash (Upstash) Configuration
```
# Development
QSTASH_URL="http://127.0.0.1:8080"
QSTASH_TOKEN=

# Production
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=

```

Vyntrix uses QStash (by Upstash) for reliable email reminder workflow for subscription renewal.

#### Development Setup (Local)
For local development, QStash runs in dev mode using the QStash CLI.

__Steps to set up QStash locally:__
- Run the following command:
`npx @upstash/qstash-cli dev`
- This starts a local QStash server at `http://127.0.0.1:8080`
- The CLI will generate a temporary QStash token
- Copy the token and paste it into your `.env.development.local` file as `QSTASH_TOKEN`

⚠️ __Note:__
For development, you do not need `QSTASH_CURRENT_SIGNING_KEY` or `QSTASH_NEXT_SIGNING_KEY`

#### Production Setup
In production, Vyntrix uses the hosted QStash service provided by Upstash.
__Steps to get your QStash credentials:__
- Go to https://upstash.com
- Create an account (or log in)
- Create a new QStash project
- Copy the following from the QStash dashboard:
  - QStash Token
  - Current Signing Key
  - Next Signing Key
- Add them to your production environment variables

These signing keys are used to verify incoming QStash requests and should always be set in production.

### 7. Nodemailer (Email) Configuration
```
EMAIL_ACCOUNT=<your_email_address>
EMAIL_PASSWORD=<your_google_app_password>
```

Vyntrix uses Nodemailer to send subscription renewal reminder emails.

#### Gmail Setup (Google App Password)
For security reasons, Gmail does not allow direct use of your account password. Instead, you must generate a __Google App Password__.

__Steps to generate a Google App Password:__
1. Go to https://myaccount.google.com
2. Navigate to Security
3. Enable 2-Step Verification on your Google account (required)
4. Once enabled, go to App passwords
5. Create a new app password
6. Give it a name (for example: `Vyntrix Nodemailer`)
7. Google will generate a 16-character app password
8. Copy the password and paste it into your `.env.development.local` file as `EMAIL_PASSWORD`

#### Note:
- `EMAIL_ACCOUNT` should be your full Gmail address, like example@gmail.com
- `EMAIL_PASSWORD` should be the app password only
- Do not use your normal Gmail password
- Never commit your app password to version control
---
## Running the Server

Once your environment variables are set, start the development server:
```
npm run dev
```

If everything is configured correctly, the server should start and listen on the port you specified.

## Next Steps

- Read the [Architecture documentation](architecture.md) to understand the project structure.

- Explore the [API Documentation](api.md) to see available endpoints.


