import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { AccidentService } from './accident.service';
import { AccidentController } from './accident.controller';
import { AccidentRepository } from '@app/global/shared/repositories/accident.repository';
import { AuthModule } from '../auth/auth.module';
import { Accident } from '@app/global/shared/models';

@Module({
  imports: [SequelizeModule.forFeature([Accident]), AuthModule],
  providers: [AccidentRepository, AccidentService],
  controllers: [AccidentController],
  exports: [AccidentService],
})
export class AccidentModule {}
