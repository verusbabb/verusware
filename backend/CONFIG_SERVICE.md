# Understanding NestJS ConfigService

This guide explains how NestJS ConfigService works and how it relates to `process.env` and `.env` files.

## What is ConfigService?

**ConfigService** is NestJS's **typed, validated way** to access environment variables. Instead of using `process.env` directly, you use ConfigService for:

- ✅ **Type safety** - Get autocomplete and type checking
- ✅ **Validation** - Ensures required values exist and are valid
- ✅ **Organization** - Groups related config into logical objects
- ✅ **Default values** - Provides sensible defaults
- ✅ **Dependency injection** - Works seamlessly with NestJS

## The Relationship: process.env → ConfigService

Here's how they connect:

```
1. .env file → dotenv loads → process.env
2. GCP Secret Manager → loads → process.env
3. ConfigService reads from → process.env
4. ConfigService provides → typed, validated config
```

**Key Point**: ConfigService is a **wrapper** around `process.env` that adds type safety and validation.

## How It Works in Your App

### Step 1: ConfigModule Setup

In `config.module.ts`:

```typescript
NestConfigModule.forRoot({
  isGlobal: true,              // Available everywhere (no need to import)
  load: [configuration],       // Load your custom config
  validate,                    // Validate against schema
  envFilePath: ['.env'],       // Load .env file
})
```

This tells NestJS:
- Load `.env` file into `process.env`
- Run your `configuration` function to transform `process.env` into typed config
- Validate values against your schema

### Step 2: Configuration Function

In `configuration.ts`:

```typescript
export default registerAs('config', (): AppConfig => {
  const env = process.env;  // Read from process.env
  
  return {
    app: {
      port: env.PORT ? parseInt(env.PORT, 10) : 3000,  // Transform & default
    },
    database: {
      password: env.DATABASE_PASSWORD,  // Direct mapping
    },
  };
});
```

This function:
- Reads from `process.env`
- Transforms values (strings → numbers, etc.)
- Groups into logical objects
- Provides defaults

### Step 3: Using ConfigService

In any service or module:

```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(
    private configService: ConfigService<AppConfig>,  // Type-safe!
  ) {}

  someMethod() {
    // Get typed config
    const config = this.configService.get<AppConfig>('config', { infer: true })!;
    
    // Access nested properties
    const port = config.app.port;           // number (typed!)
    const dbPassword = config.database.password;  // string | undefined
    
    // Or use dot notation
    const port2 = this.configService.get('config.app.port', { infer: true });
  }
}
```

## Your Config Structure

Based on your `configuration.ts`, here's your config shape:

```typescript
{
  app: {
    env: 'development' | 'production' | 'test',
    port: number,
    name: 'Verusware',
  },
  frontend: {
    url: string,
  },
  database: {
    host?: string,
    port?: number,
    name?: string,
    user?: string,
    password?: string,
  },
  jwt: {
    secret?: string,
    expiresIn?: string,
  },
  gcp: {
    projectId?: string,
    secretManagerEnabled: boolean,
  },
}
```

## Common Patterns

### Pattern 1: Get Full Config Object

```typescript
const config = this.configService.get<AppConfig>('config', { infer: true })!;
const port = config.app.port;
```

### Pattern 2: Get Nested Value

```typescript
const port = this.configService.get<number>('config.app.port', { infer: true });
```

### Pattern 3: Get with Default

```typescript
const port = this.configService.get('config.app.port', 3000);
```

### Pattern 4: In Module Factory (Like DatabaseModule)

```typescript
SequelizeModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService<AppConfig>) => {
    const config = configService.get<AppConfig>('config', { infer: true })!;
    return {
      host: config.database.host,
      password: config.database.password,
    };
  },
})
```

## Validation

Your `config.schema.ts` defines validation rules:

```typescript
export class EnvironmentVariables {
  @IsString()
  PORT: string = '3000';  // Required, must be string
  
  @IsOptional()
  @IsString()
  DATABASE_PASSWORD?: string;  // Optional
}
```

If validation fails, your app **won't start** - this catches config errors early!

## The Complete Flow

Here's what happens when your app starts:

```
1. main.ts
   ├─ dotenvConfig() → loads .env → process.env
   ├─ initializeSecrets() → loads GCP → process.env (overwrites)
   └─ NestFactory.create(AppModule)
      
2. AppModule loads ConfigModule
   ├─ ConfigModule reads process.env
   ├─ Runs configuration() function
   ├─ Validates against schema
   └─ Makes ConfigService available globally
      
3. Your code uses ConfigService
   └─ Gets typed, validated config
```

## ConfigService vs process.env

### Using process.env (Not Recommended)
```typescript
const port = process.env.PORT;  // string | undefined (no type!)
const numPort = parseInt(process.env.PORT || '3000', 10);  // Manual conversion
```

### Using ConfigService (Recommended)
```typescript
const config = this.configService.get<AppConfig>('config', { infer: true })!;
const port = config.app.port;  // number (typed, validated, with default!)
```

## Benefits of ConfigService

1. **Type Safety**: TypeScript knows the types
2. **Validation**: Catches errors at startup
3. **Organization**: Groups related config together
4. **Defaults**: Built-in fallback values
5. **Dependency Injection**: Works with NestJS DI
6. **Testing**: Easy to mock in tests

## Real Example: Your DatabaseModule

Look at how `database.module.ts` uses ConfigService:

```typescript
SequelizeModule.forRootAsync({
  inject: [ConfigService],  // Inject ConfigService
  useFactory: (configService: ConfigService<AppConfig>) => {
    const config = configService.get<AppConfig>('config', { infer: true })!;
    const dbConfig = config.database;  // Get typed database config
    
    return {
      host: dbConfig.host,        // TypeScript knows this is string | undefined
      password: dbConfig.password, // TypeScript knows this is string | undefined
      port: dbConfig.port || 5432, // With default
    };
  },
})
```

## Key Takeaways

1. **ConfigService** = Type-safe wrapper around `process.env`
2. **ConfigModule** = Sets up ConfigService (loads .env, validates, transforms)
3. **configuration.ts** = Transforms `process.env` into typed objects
4. **config.schema.ts** = Validates environment variables
5. **Always use ConfigService** instead of `process.env` directly

## Quick Reference

```typescript
// Get full config
const config = this.configService.get<AppConfig>('config', { infer: true })!;

// Get nested value
const port = this.configService.get<number>('config.app.port', { infer: true });

// Get with default
const port = this.configService.get('config.app.port', 3000);

// Check if exists
if (this.configService.get('config.database.password')) {
  // Use it
}
```

## Summary

- **process.env** = Raw environment variables (strings)
- **dotenv** = Loads .env file into process.env
- **ConfigService** = Type-safe, validated access to process.env
- **Your flow**: .env → process.env → ConfigService → Your code

ConfigService is the **recommended way** to access config in NestJS!

