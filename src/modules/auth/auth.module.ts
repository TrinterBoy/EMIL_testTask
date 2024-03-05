import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { appConfig } from '../../configs';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: appConfig.getAppSecret(),
      signOptions: { expiresIn: appConfig.getJwtExpired() },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
