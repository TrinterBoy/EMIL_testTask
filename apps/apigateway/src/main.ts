import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@app/global/shared/exeption-filters';

async function bootstrap() {
  const port = appConfig.getPort();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BACKEND')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('TEST TASK')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port || 3000);
}
bootstrap();
