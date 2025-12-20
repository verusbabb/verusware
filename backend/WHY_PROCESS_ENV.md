# Why We Use Both ConfigService and process.env

This document explains why we sometimes use `process.env` directly instead of ConfigService, and when each is appropriate.

## The Three Places We Use `process.env`

### 1. **main.ts** - Before App Creation

```typescript
// In main.ts - BEFORE NestFactory.create()
const secretManagerEnabled = process.env.GCP_SECRET_MANAGER_ENABLED === 'true';
const projectId = process.env.GCP_PROJECT_ID;

if (secretManagerEnabled && projectId) {
  await initializeSecrets(projectId, true);
}

// THEN create the app
const app = await NestFactory.create(AppModule);
```

**Why `process.env` here?**
- ConfigService doesn't exist yet! The app hasn't been created.
- We need to check GCP settings BEFORE creating the app so we can load secrets first.
- This is a **bootstrap** step that happens before NestJS is ready.

**Could we improve this?**
- Not really - this is necessary because we need to load secrets before ConfigModule initializes.

---

### 2. **configuration.ts** - Creating the Config

```typescript
// In configuration.ts
export default registerAs('config', (): AppConfig => {
  const env = process.env;  // Must use process.env here!
  
  return {
    app: {
      port: env.PORT ? parseInt(env.PORT, 10) : 3000,
    },
    // ...
  };
});
```

**Why `process.env` here?**
- This function **CREATES** the config from `process.env`.
- It's the source of truth - it transforms raw `process.env` into typed config.
- ConfigService uses this function, so it can't use ConfigService (circular dependency).

**Could we improve this?**
- No - this is how NestJS ConfigModule works. This function IS the transformation.

---

### 3. **database.config.ts** - Sequelize CLI

```typescript
// In database.config.ts - used by sequelize-cli
const databaseConfig = {
  development: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    // ...
  },
};
```

**Why `process.env` here?**
- This file is used by `sequelize-cli`, which runs **outside of NestJS**.
- ConfigService is a NestJS feature - it doesn't exist when running migrations.
- Migrations run as standalone scripts, not as part of the NestJS app.

**Could we improve this?**
- Not easily - sequelize-cli needs a plain JavaScript/TypeScript config file.
- We could potentially load secrets here too, but it's simpler to use `process.env`.

---

## The Rule of Thumb

### Use `process.env` when:
1. ✅ **Before app creation** (bootstrap code in `main.ts`)
2. ✅ **Creating the config** (in `configuration.ts`)
3. ✅ **Outside NestJS** (CLI scripts, migrations, etc.)

### Use ConfigService when:
1. ✅ **Inside NestJS modules/services** (after app is created)
2. ✅ **Dependency injection available** (inject ConfigService)
3. ✅ **Type safety needed** (get typed config objects)

## Current State Analysis

Let's look at each usage:

### ✅ Good: `main.ts` using `process.env`
```typescript
// BEFORE app creation - necessary!
const secretManagerEnabled = process.env.GCP_SECRET_MANAGER_ENABLED === 'true';
```
**Status**: Correct - can't use ConfigService yet.

### ✅ Good: `configuration.ts` using `process.env`
```typescript
// Creating config - must use process.env
const env = process.env;
```
**Status**: Correct - this IS the config creation.

### ✅ Good: `database.config.ts` using `process.env`
```typescript
// Used by sequelize-cli (outside NestJS)
username: process.env.DATABASE_USER
```
**Status**: Correct - ConfigService not available in CLI.

### ✅ Good: `database.module.ts` using ConfigService
```typescript
// Inside NestJS module - use ConfigService!
useFactory: (configService: ConfigService<AppConfig>) => {
  const config = configService.get<AppConfig>('config', { infer: true })!;
```
**Status**: Correct - this is the right way!

## Summary

We use `process.env` in three specific cases where ConfigService isn't available or appropriate:

1. **Bootstrap** (`main.ts`) - Before NestJS exists
2. **Config creation** (`configuration.ts`) - This IS the config creation
3. **CLI tools** (`database.config.ts`) - Outside NestJS context

Everywhere else, we use **ConfigService** for type safety and validation.

## Could We Improve?

The only potential improvement would be to ensure `database.config.ts` also loads secrets from GCP if needed, but since migrations typically run in environments where secrets are already loaded, this is fine.

**Bottom line**: The current usage is correct and necessary. We're not mixing them unnecessarily - each has a specific purpose.

