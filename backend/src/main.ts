import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfig } from './config/configuration';

async function bootstrap() {
  // Load secrets from Secret Manager if enabled (before app creation)
  const secretManagerEnabled = process.env.GCP_SECRET_MANAGER_ENABLED === 'true';
  const projectId = process.env.GCP_PROJECT_ID;

  if (secretManagerEnabled && projectId) {
    try {
      const { initializeSecrets } = await import('./config/secrets/secret-loader');
      await initializeSecrets(projectId, true);
      console.log('✓ Secrets loaded from GCP Secret Manager');
    } catch (error) {
      console.error('⚠ Warning: Could not load secrets from Secret Manager:', error);
      console.error('⚠ Falling back to .env files');
      // Continue with .env fallback
    }
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get config service
  const configService = app.get(ConfigService<AppConfig>);
  const config = configService.get<AppConfig>('config', { infer: true })!;

  // Use Pino logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // Security: Helmet for security headers
  app.use(helmet());

  // Validation: Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit type conversion
      },
    }),
  );

  // Exception filter is registered via APP_FILTER in AppModule
  // No need to manually register it here

  // Swagger/OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Verusware API')
    .setDescription('API documentation for Verusware backend')
    .setVersion('1.0')
    .addTag('Health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Verusware API Docs',
    customCss: '.swagger-ui .topbar { display: none }', // Hide Swagger branding
  });

  // Enable CORS for frontend
  app.enableCors({
    origin: config.frontend.url,
    credentials: true,
  });

  const port = config.app.port;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
  logger.log(`Environment: ${config.app.env}`, 'Bootstrap');
  logger.log(`Swagger documentation available at: http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap();

