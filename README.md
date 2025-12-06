# Verusware

A full-stack application with NestJS backend and Vue 3 frontend, ready for deployment to Google Cloud Platform.

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Docker** - Containerization

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Pinia** - State management
- **PrimeVue** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official router for Vue.js

## Project Structure

```
verusware/
├── backend/          # NestJS backend application
│   ├── src/
│   │   ├── health/   # Health check endpoint
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/         # Vue 3 frontend application
│   ├── src/
│   │   ├── assets/
│   │   ├── router/
│   │   ├── stores/   # Pinia stores
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.ts
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── cloudbuild.yaml   # GCP Cloud Build configuration
└── README.md
```

## Local Development

### Prerequisites
- Node.js 20+ and npm
- Docker (optional, for containerized development)
- Git (for pre-commit hooks)

### Initial Setup

1. Install root dependencies (for git hooks):
```bash
npm install
```

This will install Husky and lint-staged, and set up git hooks automatically.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Environment Variables

#### Backend
Create a `.env` file in the `backend/` directory:
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

#### Frontend
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:3000
```

## Git Hooks (Pre-commit Linting & Formatting)

This project uses **Husky** and **lint-staged** to automatically run linting and formatting on staged files before each commit.

### How it works

When you commit code, the pre-commit hook will:
1. Run **Prettier** to format staged files
2. Run **ESLint** to check and fix linting issues
3. Only process files that are staged (efficient)
4. Prevent the commit if there are unfixable linting errors

### Setup

The git hooks are automatically set up when you run `npm install` at the root level (thanks to the `prepare` script).

### Manual Setup (if needed)

If you need to manually set up the hooks:
```bash
npm install
npx husky install
```

### Bypassing Hooks (if needed)

If you need to bypass the pre-commit hook for a specific commit:
```bash
git commit --no-verify -m "your message"
```

⚠️ **Note:** Only bypass hooks when absolutely necessary, as it skips code quality checks.

## Building for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in the `dist/` directory.

## Docker

### Build Backend Image
```bash
cd backend
docker build -t verusware-backend .
docker run -p 3000:3000 verusware-backend
```

### Build Frontend Image
```bash
cd frontend
docker build -t verusware-frontend .
docker run -p 80:80 verusware-frontend
```

## GCP Deployment

### Prerequisites
1. Google Cloud Platform account
2. GCP project created
3. `gcloud` CLI installed and authenticated
4. Cloud Build API enabled
5. Cloud Run API enabled
6. Container Registry API enabled

### Initial Setup

1. Set your GCP project ID:
```bash
gcloud config set project YOUR_PROJECT_ID
```

2. Enable required APIs:
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable sqladmin.googleapis.com
```

### Database Setup (PostgreSQL)

1. Create a Cloud SQL PostgreSQL instance (f1-micro free tier):
```bash
gcloud sql instances create verusware-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=YOUR_PASSWORD
```

2. Create a database:
```bash
gcloud sql databases create verusware \
  --instance=verusware-db
```

### Deploy with Cloud Build

1. Submit the build:
```bash
gcloud builds submit --config cloudbuild.yaml
```

This will:
- Build Docker images for both backend and frontend
- Push images to Container Registry
- Deploy backend to Cloud Run
- Deploy frontend to Cloud Run

### Manual Deployment

#### Deploy Backend

1. Build and push the image:
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/verusware-backend
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy verusware-backend \
  --image gcr.io/YOUR_PROJECT_ID/verusware-backend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

#### Deploy Frontend

1. Build and push the image:
```bash
cd frontend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/verusware-frontend
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy verusware-frontend \
  --image gcr.io/YOUR_PROJECT_ID/verusware-frontend \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 80 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

### Frontend Configuration

**Important:** Frontend environment variables are baked into the build at build time, not runtime.

1. Get your backend URL:
```bash
BACKEND_URL=$(gcloud run services describe verusware-backend \
  --region us-central1 \
  --format 'value(status.url)')
```

2. Rebuild and redeploy frontend with the correct API URL:
```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_FRONTEND_API_URL=${BACKEND_URL}
```

**Note:** Frontend configuration must be set during the build process. See `DEPLOYMENT.md` for detailed deployment instructions.

## Cost Optimization

This setup is optimized for free/low-cost tiers:

- **Cloud Run**: Free tier includes 2 million requests/month
- **Cloud SQL**: f1-micro instance is free (with usage limits)
- **Cloud Build**: 120 build-minutes/day free
- **Container Registry**: Free storage for images

Estimated monthly cost: **$0-5** for low-traffic applications.

## Health Check

The backend includes a health check endpoint at `/health` that returns:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

The frontend includes a demo page that calls this endpoint to verify connectivity.

## Development Scripts

### Backend
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

UNLICENSED
