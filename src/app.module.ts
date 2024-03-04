import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { appConfig, models } from './configs/config';

const postgresConfig = appConfig.getPostgresConnection();

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...(postgresConfig as SequelizeModuleOptions),
      models,
      logging: false,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
