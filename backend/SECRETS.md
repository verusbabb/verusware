# Secrets Management Guide

This guide explains how to manage secrets for local development and GCP deployment.

## 🎯 Unified Secrets Management

**You can now use GCP Secret Manager for ALL secrets, even locally!**

Set `GCP_SECRET_MANAGER_ENABLED=true` and authenticate with GCP - secrets will be automatically loaded from Secret Manager. Falls back to `.env` files if Secret Manager is unavailable.

### Quick Start (Unified Approach)

1. **Store all secrets in GCP Secret Manager** (single source of truth)
2. **Authenticate locally:**
   ```bash
   gcloud auth application-default login
   ```
3. **Set in `.env`:**
   ```bash
   GCP_SECRET_MANAGER_ENABLED=true
   GCP_PROJECT_ID=your-project-id
   ```
4. **Start your app** - secrets load automatically!

See `src/config/secrets/README.md` for detailed setup.

## Local Development

### Setup

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your local values:
   ```bash
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

3. The `.env` file is gitignored and will never be committed.

### Adding Secrets

1. Add to `backend/src/config/config.schema.ts` with validation
2. Add to `backend/src/config/configuration.ts` to map to config
3. Update `.env.example` (without actual secrets)
4. Add to your local `.env` file

## GCP Deployment

### Option 1: Cloud Run Environment Variables (Non-Sensitive)

For configuration values that aren't secrets:

```bash
gcloud run services update verusware-backend \
  --region us-central1 \
  --set-env-vars NODE_ENV=production,FRONTEND_URL=https://your-frontend.com
```

### Option 2: GCP Secret Manager (Sensitive Secrets)

For passwords, API keys, and other sensitive data:

#### 1. Create a Secret

```bash
# Create secret
echo -n "your-secret-value" | gcloud secrets create database-password \
  --data-file=- \
  --replication-policy="automatic" \
  --project=YOUR_PROJECT_ID
```

#### 2. Grant Access to Cloud Run Service Account

```bash
# Get your service account email
SERVICE_ACCOUNT=$(gcloud run services describe verusware-backend \
  --region us-central1 \
  --format 'value(spec.template.spec.serviceAccountName)')

# Grant access
gcloud secrets add-iam-policy-binding database-password \
  --member="serviceAccount:${SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor" \
  --project=YOUR_PROJECT_ID
```

#### 3. Use in Application

```typescript
import { getSecret } from '@/config/secrets/gcp-secret-manager';
import { ConfigService } from '@nestjs/config';

// In your service
const config = this.configService.get<AppConfig>('config', { infer: true })!;
if (config.gcp.secretManagerEnabled) {
  const dbPassword = await getSecret('database-password', config.gcp.projectId!);
}
```

#### 4. Set Environment Variables in Cloud Run

```bash
gcloud run services update verusware-backend \
  --region us-central1 \
  --set-env-vars GCP_SECRET_MANAGER_ENABLED=true,GCP_PROJECT_ID=YOUR_PROJECT_ID
```

## Best Practices

### ✅ DO

- Use `.env` files for local development
- Use Secret Manager for production secrets
- Use Cloud Run env vars for non-sensitive config
- Always validate environment variables
- Never commit `.env` files
- Document required variables in `.env.example`

### ❌ DON'T

- Commit secrets to git
- Hardcode secrets in code
- Store secrets in Docker images
- Share `.env` files via insecure channels

## Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists (without real secrets)
- [ ] Production secrets are in Secret Manager
- [ ] Service account has minimal required permissions
- [ ] Secrets are rotated regularly
- [ ] Access logs are monitored

## Troubleshooting

### Config Validation Fails

Check that all required environment variables are set. The error message will tell you which ones are missing or invalid.

### Secret Manager Access Denied

Ensure the Cloud Run service account has the `secretmanager.secretAccessor` role for the secret.

### Local Development Not Working

Make sure you have a `.env` file in the `backend/` directory with all required variables.

