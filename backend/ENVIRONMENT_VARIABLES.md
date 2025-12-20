# Understanding Environment Variables

This guide explains how environment variables work in your application, from `.env` files to GCP Secret Manager.

## What Are Environment Variables?

Environment variables are key-value pairs that store configuration data **outside your code**. This is important because:

- ✅ **Security**: Secrets (passwords, API keys) never go in your code
- ✅ **Flexibility**: Same code works in different environments (dev, staging, prod)
- ✅ **Version Control**: `.env` files are gitignored, so secrets don't get committed

## The Basics: `process.env`

`process.env` is a **global object** in Node.js that contains all environment variables.

```javascript
// Access an environment variable
const port = process.env.PORT;  // Returns a string or undefined

// Set an environment variable (in your code)
process.env.MY_VAR = 'some value';

// Check if it exists
if (process.env.DATABASE_PASSWORD) {
  // Use it
}
```

**Important**: All values in `process.env` are **strings**. If you need a number, convert it:
```javascript
const port = parseInt(process.env.PORT || '3000', 10);
```

## Where Do Environment Variables Come From?

Environment variables can come from multiple sources, in this order:

### 1. **System Environment** (Highest Priority)
Variables set in your operating system or shell:
```bash
# In your terminal
export DATABASE_PASSWORD=mysecret
node server.js  # Now process.env.DATABASE_PASSWORD = 'mysecret'
```

### 2. **GCP Secret Manager** (Production)
Secrets loaded from Google Cloud Platform (overrides .env files)

### 3. **`.env` Files** (Development)
Files in your project directory

### 4. **Default Values** (Fallback)
Hardcoded defaults in your code

## What is `dotenv`?

`dotenv` is a **library** that reads a `.env` file and loads its contents into `process.env`.

### How It Works

1. **You have a `.env` file:**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=verusware
DATABASE_USER=postgres
DATABASE_PASSWORD=breck4355
PORT=3000
```

2. **You call `dotenv.config()`:**
```javascript
import { config as dotenvConfig } from 'dotenv';

// This reads .env and loads it into process.env
dotenvConfig();

// Now process.env.DATABASE_HOST = 'localhost'
//     process.env.DATABASE_PORT = '5432'
//     etc.
```

3. **Your code uses `process.env`:**
```javascript
const dbHost = process.env.DATABASE_HOST;  // 'localhost'
```

### `.env` File Rules

- **Format**: `KEY=value` (no spaces around `=`)
- **No quotes needed**: `DATABASE_NAME=verusware` (not `DATABASE_NAME="verusware"`)
- **Comments**: Start with `#`
- **Never commit**: Add `.env` to `.gitignore`

```env
# This is a comment
DATABASE_HOST=localhost
DATABASE_PORT=5432

# Another comment
PORT=3000
```

## Your Application's Flow

Here's exactly what happens when your app starts:

### Step 1: Load `.env` File (Development)

```typescript
// In main.ts
import { config as dotenvConfig } from 'dotenv';

// Try to find and load .env file
dotenvConfig({ path: '.env' });
// Now process.env has values from .env file
```

**Result**: `process.env.DATABASE_PASSWORD` = value from `.env` file

### Step 2: Load GCP Secrets (If Enabled)

```typescript
// Check if Secret Manager is enabled
if (process.env.GCP_SECRET_MANAGER_ENABLED === 'true') {
  // Load secrets from GCP
  await initializeSecrets(projectId, true);
  // This sets process.env.DATABASE_PASSWORD = value from GCP
  // (overwrites the .env value)
}
```

**Result**: `process.env.DATABASE_PASSWORD` = value from GCP Secret Manager (overrides `.env`)

### Step 3: Use in Your Code

```typescript
// In configuration.ts
const config = {
  database: {
    password: process.env.DATABASE_PASSWORD,  // Gets the value (from .env or GCP)
  }
};
```

## Real Example: Your Database Config

Let's trace through your actual code:

### 1. `.env` File (in `backend/.env`)
```env
DATABASE_HOST=localhost
DATABASE_PASSWORD=breck4355
```

### 2. `main.ts` Loads It
```typescript
dotenvConfig({ path: '.env' });
// process.env.DATABASE_PASSWORD = 'breck4355'
```

### 3. Secret Manager (If Enabled)
```typescript
if (GCP_SECRET_MANAGER_ENABLED === 'true') {
  // Fetches 'database-password' from GCP
  // Sets process.env.DATABASE_PASSWORD = <GCP value>
  // This OVERWRITES the .env value
}
```

### 4. Database Config Uses It
```typescript
// In database.config.ts
const config = {
  password: process.env.DATABASE_PASSWORD,  // Final value (GCP or .env)
};
```

## Common Patterns

### Pattern 1: Default Values
```typescript
// If DATABASE_PORT doesn't exist, use 5432
const port = process.env.DATABASE_PORT || '5432';
```

### Pattern 2: Required Variables
```typescript
if (!process.env.DATABASE_PASSWORD) {
  throw new Error('DATABASE_PASSWORD is required!');
}
```

### Pattern 3: Type Conversion
```typescript
// process.env always returns strings
const port = parseInt(process.env.PORT || '3000', 10);  // Convert to number
const isEnabled = process.env.FEATURE_FLAG === 'true';  // Convert to boolean
```

## Local Development vs Production

### Local Development
```
1. Read .env file → process.env
2. Use process.env values
3. (Secret Manager optional if you want to test it)
```

### Production (GCP)
```
1. Read .env file → process.env (if present)
2. Load from GCP Secret Manager → process.env (overwrites .env)
3. Use process.env values (from GCP)
```

## Key Takeaways

1. **`process.env`** = Global object with all environment variables
2. **`dotenv`** = Library that reads `.env` files into `process.env`
3. **`.env` file** = Local file with key-value pairs (gitignored)
4. **GCP Secret Manager** = Cloud storage for secrets (overrides `.env`)
5. **Priority**: System env > GCP Secrets > `.env` file > Defaults

## Quick Reference

```javascript
// Load .env file
import { config } from 'dotenv';
config();  // Loads .env into process.env

// Access variable
const value = process.env.MY_VAR;

// With default
const value = process.env.MY_VAR || 'default';

// Check if exists
if (process.env.MY_VAR) {
  // Use it
}

// Set in code (usually not recommended)
process.env.MY_VAR = 'value';
```

## Your Specific Setup

In your app, here's the exact flow:

1. **`main.ts`** calls `dotenvConfig()` → loads `.env` into `process.env`
2. **`main.ts`** checks `GCP_SECRET_MANAGER_ENABLED`
3. If `true`, calls `initializeSecrets()` → loads GCP secrets into `process.env` (overwrites `.env`)
4. **`ConfigService`** reads from `process.env` → provides typed config
5. Your code uses `ConfigService` → gets final values

The beauty: **Your code doesn't care** where the values came from - it just reads from `process.env`!

