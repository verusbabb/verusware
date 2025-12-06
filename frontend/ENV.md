# Frontend Environment Variables Guide

## Important Differences from Backend

⚠️ **Critical Security Note**: Frontend environment variables are:
- **Baked into the build** at build time (not runtime)
- **Exposed to the browser** - anyone can see them in the built JavaScript
- **Never store sensitive secrets** (API keys, passwords, etc.) in frontend env vars

## Local Development

### Setup

1. Create `.env` file in `frontend/` directory:
   ```bash
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=Verusware
   VITE_APP_VERSION=1.0.0
   ```

2. The `.env` file is gitignored and will never be committed.

### Vite Environment Variables

- Must be prefixed with `VITE_` to be accessible in code
- Access via `import.meta.env.VITE_*`
- Available at build time, not runtime

## GCP Deployment

### Option 1: Cloud Storage + CDN (Static Hosting)

Environment variables are **baked into the build** before deployment:

```bash
# Build with production env vars
VITE_API_URL=https://your-backend-url.run.app \
VITE_APP_NAME=Verusware \
npm run build

# Deploy the built files
gsutil -m rsync -r dist/ gs://your-bucket-name/
```

### Option 2: Cloud Run (Container)

Set environment variables during the **build process** in Cloud Build:

```yaml
# In cloudbuild.yaml
steps:
  - name: 'node:20'
    entrypoint: 'npm'
    args: ['run', 'build']
    env:
      - 'VITE_API_URL=${_API_URL}'
      - 'VITE_APP_NAME=${_APP_NAME}'
```

Or use substitution variables:

```bash
gcloud builds submit \
  --substitutions=_API_URL=https://your-backend-url,_APP_NAME=Verusware
```

### Option 3: Runtime Configuration (Advanced)

For runtime configuration, you can:
1. Load config from a JSON file served by your backend
2. Use a config endpoint that returns environment-specific settings
3. Inject config via a script tag in `index.html`

Example approach:
```typescript
// Load config from backend at runtime
const config = await fetch('/api/config').then(r => r.json())
```

## Available Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Production: Yes | `http://localhost:3000` | Backend API URL |
| `VITE_APP_NAME` | No | `Verusware` | Application name |
| `VITE_APP_VERSION` | No | `1.0.0` | Application version |

## Usage in Code

```typescript
import { env } from '@/config/env'

// Access config
const apiUrl = env.apiUrl
const isProduction = env.isProd
```

## Best Practices

### ✅ DO

- Use `.env` files for local development
- Use `VITE_` prefix for all variables
- Store only non-sensitive configuration
- Validate required variables in production builds
- Document all variables in `.env.example`

### ❌ DON'T

- Store API keys or secrets in frontend env vars
- Commit `.env` files
- Use frontend env vars for sensitive data
- Rely on runtime environment variables (they're baked in)

## Security Reminder

**Never store sensitive data in frontend environment variables!**

- API keys → Use backend proxy endpoints
- Secrets → Keep in backend only
- Database credentials → Backend only
- JWT secrets → Backend only

If you need to use third-party services from the frontend:
1. Create backend endpoints that proxy requests
2. Store API keys in backend environment variables
3. Frontend calls your backend, backend calls the service

