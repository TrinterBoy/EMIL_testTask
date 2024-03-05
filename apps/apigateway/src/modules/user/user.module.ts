import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '@app/global/shared/repositories/user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, AuthService, JwtService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
