import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from 'src/models';
import { AuthModule } from '../auth/auth.module';
import { ContractRepository } from './contract.repository';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';

@Module({
  imports: [SequelizeModule.forFeature([Contract]), AuthModule],
  providers: [ContractRepository, ContractService],
  controllers: [ContractController],
  exports: [ContractService],
})
export class ContractModule {}
