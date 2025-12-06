# GCP Secret Manager Integration

This directory contains utilities for integrating with GCP Secret Manager.

## Unified Secrets Management

You can now use **GCP Secret Manager for all secrets, even locally!**

### How It Works

1. **Store all secrets in GCP Secret Manager** (single source of truth)
2. **Set environment variables** to enable Secret Manager
3. **Authenticate locally** with GCP
4. **Secrets are automatically loaded** at startup
5. **Falls back to .env** if Secret Manager is unavailable

## Setup

### 1. Install Secret Manager Client

```bash
npm install @google-cloud/secret-manager
```

### 2. Enable Secret Manager API

```bash
gcloud services enable secretmanager.googleapis.com
```

### 3. Create Secrets in Secret Manager

```bash
# Example: Create database password secret
echo -n "your-database-password" | gcloud secrets create database-password \
  --data-file=- \
  --replication-policy="automatic" \
  --project=YOUR_PROJECT_ID

# Create JWT secret
echo -n "your-jwt-secret" | gcloud secrets create jwt-secret \
  --data-file=- \
  --replication-policy="automatic" \
  --project=YOUR_PROJECT_ID
```

### 4. Local Development Setup

#### Option A: Use Secret Manager Locally (Recommended)

1. **Authenticate with GCP:**
   ```bash
   gcloud auth application-default login
   ```

2. **Set environment variables in `.env`:**
   ```bash
   GCP_SECRET_MANAGER_ENABLED=true
   GCP_PROJECT_ID=your-project-id
   ```

3. **Start your app** - secrets will be loaded automatically!

#### Option B: Use .env Files (Fallback)

If Secret Manager is disabled or unavailable, the app automatically falls back to `.env` files:

```bash
# In .env file
GCP_SECRET_MANAGER_ENABLED=false
DATABASE_PASSWORD=local-password
JWT_SECRET=local-jwt-secret
```

### 5. Production Setup

In Cloud Run, secrets are automatically loaded if:
- `GCP_SECRET_MANAGER_ENABLED=true` is set
- `GCP_PROJECT_ID` is set
- Service account has Secret Manager access

```bash
gcloud run services update verusware-backend \
  --region us-central1 \
  --set-env-vars GCP_SECRET_MANAGER_ENABLED=true,GCP_PROJECT_ID=YOUR_PROJECT_ID
```

### 6. Grant Access

Grant your service account (or user account for local) access to secrets:

```bash
# For local development (your user account)
gcloud secrets add-iam-policy-binding database-password \
  --member="user:YOUR_EMAIL@gmail.com" \
  --role="roles/secretmanager.secretAccessor" \
  --project=YOUR_PROJECT_ID

# For Cloud Run (service account)
SERVICE_ACCOUNT=$(gcloud run services describe verusware-backend \
  --region us-central1 \
  --format 'value(spec.template.spec.serviceAccountName)')

gcloud secrets add-iam-policy-binding database-password \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor" \
  --project=YOUR_PROJECT_ID
```

## Adding New Secrets

1. **Create secret in Secret Manager:**
   ```bash
   echo -n "secret-value" | gcloud secrets create secret-name \
     --data-file=- \
     --replication-policy="automatic"
   ```

2. **Add mapping in `secret-loader.ts`:**
   ```typescript
   const SECRET_MAPPINGS: Record<string, string> = {
     // ... existing mappings
     'secret-name': 'ENV_VAR_NAME',
   };
   ```

3. **Add to config schema** (`config.schema.ts`) if needed

4. **Use in your code** via ConfigService as normal!

## Secret Mappings

Current mappings (defined in `secret-loader.ts`):

| Secret Manager Name | Environment Variable | Description |
|---------------------|---------------------|-------------|
| `database-password` | `DATABASE_PASSWORD` | Database password |
| `database-user` | `DATABASE_USER` | Database user |
| `jwt-secret` | `JWT_SECRET` | JWT signing secret |

## Benefits

✅ **Single source of truth** - All secrets in one place  
✅ **Works locally and in production** - Same setup everywhere  
✅ **Automatic fallback** - Uses .env if Secret Manager unavailable  
✅ **Type-safe** - Same ConfigService interface  
✅ **Secure** - Secrets never in code or .env files  

## Troubleshooting

### "Failed to load secrets from Secret Manager"

**Local:**
- Run `gcloud auth application-default login`
- Check `GCP_PROJECT_ID` is correct
- Verify you have access to the secrets

**Production:**
- Check service account has `secretmanager.secretAccessor` role
- Verify `GCP_PROJECT_ID` is set correctly
- Check Cloud Run logs for detailed errors

### "Secret has no mapping"

Add the secret name to `SECRET_MAPPINGS` in `secret-loader.ts`.

### Fallback to .env

If Secret Manager fails, the app will:
- Log a warning
- Continue with .env files (in development)
- Fail fast in production (to prevent insecure fallback)
