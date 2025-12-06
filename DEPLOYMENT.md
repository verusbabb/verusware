# Deployment Guide

## Frontend Configuration in GCP

### Important: Frontend Doesn't Use "Secrets"

The frontend uses **non-sensitive configuration** (API URLs, app name, etc.) that is:
- **Baked into the build** at build time
- **Exposed in the browser** (anyone can see it)
- **Never contains secrets** (API keys, passwords, etc.)

### Where Frontend Config Comes From in Deployment

Frontend configuration values come from **Cloud Build substitution variables** during the build process.

## Option 1: Cloud Build Substitution Variables (Recommended)

### Setup

1. **Get your backend URL:**
   ```bash
   BACKEND_URL=$(gcloud run services describe verusware-backend \
     --region us-central1 \
     --format 'value(status.url)')
   ```

2. **Deploy with substitution variables:**
   ```bash
   gcloud builds submit --config cloudbuild.yaml \
     --substitutions=_FRONTEND_API_URL=${BACKEND_URL},_APP_NAME=Verusware,_APP_VERSION=1.0.0
   ```

### Using Secret Manager Values

You can fetch values from Secret Manager during build:

```bash
# Get backend URL from Secret Manager (if stored there)
BACKEND_URL=$(gcloud secrets versions access latest --secret=backend-url)

# Or use a direct URL
BACKEND_URL=https://verusware-backend-xxxxx.run.app

# Deploy
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_FRONTEND_API_URL=${BACKEND_URL}
```

## Option 2: Store in Secret Manager and Access During Build

### Create Secret for Frontend Config

```bash
# Store backend URL in Secret Manager
echo -n "https://your-backend-url.run.app" | gcloud secrets create frontend-api-url \
  --data-file=- \
  --replication-policy="automatic"
```

### Access in Cloud Build

Update `cloudbuild.yaml` to fetch from Secret Manager:

```yaml
steps:
  # Fetch secret before building
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        export FRONTEND_API_URL=$(gcloud secrets versions access latest --secret=frontend-api-url)
        # Continue with build...
```

## Option 3: Environment Variables in Cloud Build

Set environment variables directly in `cloudbuild.yaml`:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    env:
      - 'VITE_API_URL=https://your-backend-url.run.app'
      - 'VITE_APP_NAME=Verusware'
    args: ['build', ...]
```

## Current Setup

The `cloudbuild.yaml` uses **substitution variables** (`${_FRONTEND_API_URL}`), which means:

1. **You pass values when running the build:**
   ```bash
   gcloud builds submit --config cloudbuild.yaml \
     --substitutions=_FRONTEND_API_URL=https://your-backend-url
   ```

2. **Values can come from:**
   - Direct URLs
   - Secret Manager (fetched before build)
   - Other Cloud Build outputs
   - Environment variables

## Recommended Workflow

### For Production Deployment

```bash
# 1. Deploy backend first
gcloud builds submit --config cloudbuild.yaml

# 2. Get backend URL
BACKEND_URL=$(gcloud run services describe verusware-backend \
  --region us-central1 \
  --format 'value(status.url)')

# 3. Deploy frontend with backend URL
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_FRONTEND_API_URL=${BACKEND_URL}
```

### For CI/CD Pipeline

In your CI/CD (GitHub Actions, Cloud Build triggers, etc.):

```yaml
# Example GitHub Actions
- name: Deploy Backend
  run: gcloud builds submit --config cloudbuild.yaml

- name: Get Backend URL
  id: backend
  run: |
    URL=$(gcloud run services describe verusware-backend \
      --region us-central1 \
      --format 'value(status.url)')
    echo "url=${URL}" >> $GITHUB_OUTPUT

- name: Deploy Frontend
  run: |
    gcloud builds submit --config cloudbuild.yaml \
      --substitutions=_FRONTEND_API_URL=${{ steps.backend.outputs.url }}
```

## Summary

**Frontend configuration in deployment:**
- ✅ Set during **Cloud Build** via substitution variables
- ✅ Values can come from **Secret Manager** (fetched before build)
- ✅ Values can come from **direct URLs** or **environment variables**
- ✅ **Baked into the build** - not runtime config
- ❌ **Never contains secrets** - only non-sensitive config

**Backend secrets in deployment:**
- ✅ Use **GCP Secret Manager** (unified approach)
- ✅ Or **Cloud Run environment variables** (non-sensitive)
- ✅ Loaded at **runtime** (not build time)

