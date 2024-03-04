import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { appConfig, models } from './configs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

const postgresConfig = appConfig.getPostgresConnection();

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...(postgresConfig as SequelizeModuleOptions),
      models,
      logging: false,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
