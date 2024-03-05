import { Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from '../../../../../libs/global/src/shared/models';
import { ContractRepository } from '@app/global/shared/repositories/contract.repository';
import { CreateContractRequestDto, UpdateContractRequestDto } from './dto';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepository: ContractRepository) {}

  async getAll(): Promise<Contract[]> {
    return await this.contractRepository.getAll();
  }

  async findById(id: string): Promise<Contract> {
    const user = await this.contractRepository.getOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any contract with id: ${id}`);
    }
    return user;
  }

  async findByUser(userId: string): Promise<Contract> {
    const contract = await this.contractRepository.getOneByUser(userId);
    return contract || null;
  }

  async create(data: CreateContractRequestDto): Promise<Contract> {
    return await this.contractRepository.create(data);
  }

  async update(id: string, dto: UpdateContractRequestDto): Promise<Contract> {
    const contract: Contract = await this.findById(id);
    if (!contract) {
      throw new NotFoundException(`There isn't any contract with id: ${id}`);
    }
    return await this.contractRepository.update(id, dto);
  }

  async delete(id: string): Promise<string | void> {
    const user = await this.contractRepository.getOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any contract with id: ${id}`);
    }
    return await this.contractRepository.delete(user.id);
  }
}
