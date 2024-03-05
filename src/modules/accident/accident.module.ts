import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Accident } from 'src/models';
import { AccidentService } from './accident.service';
import { AccidentController } from './accident.controller';
import { AccidentRepository } from './accident.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Accident]), AuthModule],
  providers: [AccidentRepository, AccidentService],
  controllers: [AccidentController],
  exports: [AccidentService],
})
export class AccidentModule {}
