import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './configs/config';

async function bootstrap() {
  const port = appConfig.getPort();
  const app = await NestFactory.create(AppModule);
  await app.listen(port || 3000);
}
bootstrap();
