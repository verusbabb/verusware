# Complete GCP Deployment Guide for verusware.com

This guide will walk you through deploying your full-stack application to GCP and setting up your custom domain.

## Prerequisites Checklist

- [x] GCP account created
- [x] Domain purchased (verusware.com)
- [ ] gcloud CLI installed
- [ ] GCP project created
- [ ] Billing enabled on GCP project

## Step 1: Install Google Cloud CLI

### macOS Installation

```bash
# Download and install
curl https://sdk.cloud.google.com | bash

# Restart your shell or run:
exec -l $SHELL

# Initialize gcloud
gcloud init
```

During `gcloud init`, you'll:
1. Log in to your Google account
2. Select or create a GCP project
3. Choose a default region (us-central1 is good)

### Verify Installation

```bash
gcloud --version
gcloud auth list
```

## Step 2: Create GCP Project

If you didn't create one during `gcloud init`:

```bash
# Create project
gcloud projects create verusware --name="Verusware"

# Set as current project
gcloud config set project verusware

# Enable billing (required for Cloud Run and Cloud SQL)
# You'll need to do this in the GCP Console:
# https://console.cloud.google.com/billing
```

## Step 3: Enable Required APIs

```bash
# Enable all required APIs at once
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  containerregistry.googleapis.com \
  compute.googleapis.com
```

## Step 4: Set Up PostgreSQL Database

### Create Cloud SQL Instance (Free Tier)

```bash
# Create PostgreSQL instance (f1-micro is free tier)
gcloud sql instances create verusware-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=YOUR_SECURE_PASSWORD_HERE

# Create database
gcloud sql databases create verusware \
  --instance=verusware-db

# Note: Save the password securely! You'll need it later.
```

**Important:** Replace `YOUR_SECURE_PASSWORD_HERE` with a strong password. Save it in Secret Manager (see Step 5).

## Step 5: Set Up Secrets in Secret Manager

### Store Database Password

```bash
# Store database password in Secret Manager
echo -n "YOUR_DATABASE_PASSWORD" | gcloud secrets create database-password \
  --data-file=- \
  --replication-policy="automatic"

# Store database user (if different from default)
echo -n "postgres" | gcloud secrets create database-user \
  --data-file=- \
  --replication-policy="automatic"
```

### Get Database Connection Info

```bash
# Get connection name (you'll need this)
gcloud sql instances describe verusware-db \
  --format="value(connectionName)"

# Output will be like: verusware:us-central1:verusware-db
# Save this value!
```

## Step 6: Configure Backend Environment

### Option A: Use Secret Manager (Recommended)

Create a `.env` file in `backend/` for local reference (won't be deployed):

```bash
cd backend
cat > .env << EOF
NODE_ENV=production
PORT=3000
GCP_SECRET_MANAGER_ENABLED=true
GCP_PROJECT_ID=verusware
DATABASE_HOST=/cloudsql/verusware:us-central1:verusware-db
DATABASE_NAME=verusware
EOF
```

### Option B: Use Environment Variables

Set in Cloud Run after deployment (see Step 8).

## Step 7: Deploy Backend to Cloud Run

### First Deployment

```bash
# From the root directory
cd /Users/stevebabb/verusware/verusware

# Deploy backend
cd backend
gcloud builds submit --tag gcr.io/verusware/verusware-backend

# Deploy to Cloud Run
gcloud run deploy verusware-backend \
  --image gcr.io/verusware/verusware-backend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars NODE_ENV=production,GCP_SECRET_MANAGER_ENABLED=true,GCP_PROJECT_ID=verusware \
  --add-cloudsql-instances verusware:us-central1:verusware-db

# Get the backend URL
BACKEND_URL=$(gcloud run services describe verusware-backend \
  --region us-central1 \
  --format 'value(status.url)')

echo "Backend URL: $BACKEND_URL"
```

**Save the BACKEND_URL** - you'll need it for the frontend!

## Step 8: Deploy Frontend to Cloud Run

```bash
# From root directory
cd frontend

# Build and deploy with backend URL
gcloud builds submit \
  --tag gcr.io/verusware/verusware-frontend \
  --substitutions=_FRONTEND_API_URL=${BACKEND_URL}

# Deploy to Cloud Run
gcloud run deploy verusware-frontend \
  --image gcr.io/verusware/verusware-frontend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 80 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10

# Get the frontend URL
FRONTEND_URL=$(gcloud run services describe verusware-frontend \
  --region us-central1 \
  --format 'value(status.url)')

echo "Frontend URL: $FRONTEND_URL"
```

## Step 9: Set Up Custom Domain (verusware.com)

### 9.1: Map Domain to Cloud Run Services

```bash
# Map backend subdomain (api.verusware.com)
gcloud run domain-mappings create \
  --service verusware-backend \
  --domain api.verusware.com \
  --region us-central1

# Map frontend domain (verusware.com and www.verusware.com)
gcloud run domain-mappings create \
  --service verusware-frontend \
  --domain verusware.com \
  --region us-central1

gcloud run domain-mappings create \
  --service verusware-frontend \
  --domain www.verusware.com \
  --region us-central1
```

### 9.2: Get DNS Records

After creating domain mappings, get the DNS records:

```bash
# Get DNS records for backend
gcloud run domain-mappings describe api.verusware.com \
  --region us-central1 \
  --format="value(status.resourceRecords)"

# Get DNS records for frontend
gcloud run domain-mappings describe verusware.com \
  --region us-central1 \
  --format="value(status.resourceRecords)"
```

### 9.3: Configure DNS in GoDaddy

1. Log in to GoDaddy
2. Go to DNS Management for verusware.com
3. Add the DNS records from Step 9.2:
   - **Type A** records pointing to the IP addresses provided
   - **CNAME** records if provided

**Example DNS records you'll add:**
- `api.verusware.com` → A record (IP from GCP)
- `verusware.com` → A record (IP from GCP)
- `www.verusware.com` → CNAME to `verusware.com` or A record

### 9.4: Wait for DNS Propagation

DNS changes can take 24-48 hours, but usually work within a few hours.

Verify DNS:
```bash
# Check if DNS is propagated
dig verusware.com
dig api.verusware.com
```

## Step 10: Update Backend CORS

After your domain is set up, update backend CORS:

```bash
gcloud run services update verusware-backend \
  --region us-central1 \
  --set-env-vars FRONTEND_URL=https://verusware.com
```

## Step 11: Update Frontend API URL

Rebuild and redeploy frontend with the new API URL:

```bash
cd frontend

gcloud builds submit \
  --tag gcr.io/verusware/verusware-frontend \
  --substitutions=_FRONTEND_API_URL=https://api.verusware.com

gcloud run deploy verusware-frontend \
  --image gcr.io/verusware/verusware-frontend \
  --region us-central1
```

## Step 12: Verify Everything Works

1. **Check backend health:**
   - https://api.verusware.com/health
   - https://api.verusware.com/api (Swagger docs)

2. **Check frontend:**
   - https://verusware.com

3. **Test the full flow:**
   - Visit verusware.com
   - Click "Check Health" button
   - Should connect to backend and show health status

## Troubleshooting

### Backend not starting
- Check Cloud Run logs: `gcloud run services logs read verusware-backend --region us-central1`
- Verify secrets are accessible
- Check database connection

### Frontend can't connect to backend
- Verify CORS settings in backend
- Check API URL in frontend build
- Verify both services are deployed

### DNS not working
- Wait 24-48 hours for full propagation
- Verify DNS records in GoDaddy match GCP records
- Use `dig` or `nslookup` to check DNS

### SSL Certificate Issues
- Cloud Run automatically provisions SSL certificates
- Wait for domain mapping to complete (can take 15-30 minutes)
- Check domain mapping status: `gcloud run domain-mappings list --region us-central1`

## Cost Estimate

With free tiers:
- **Cloud Run**: Free tier (2M requests/month)
- **Cloud SQL**: f1-micro instance (free with usage limits)
- **Cloud Build**: 120 build-minutes/day free
- **Domain**: Already paid for

**Estimated monthly cost: $0-5** for low traffic.

## Next Steps After Deployment

1. Set up monitoring and alerts
2. Configure backup strategy for database
3. Set up CI/CD pipeline (optional)
4. Add custom error pages
5. Configure CDN for frontend (optional)

