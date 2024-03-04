import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { appConfig } from "../config";

const postgresConfig = appConfig.getPostgresConnection();
console.log(postgresConfig)
const models = [];

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...postgresConfig as SequelizeModuleOptions,
      models,
      logging: false,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
