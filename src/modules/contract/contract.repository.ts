import { InjectModel } from '@nestjs/sequelize';
import { Contract } from 'src/models';
import { mappingUpdateResponse } from 'src/shared/helpers';
import { CreateContractRequestDto, UpdateContractRequestDto } from './dto';

export class ContractRepository {
  constructor(
    @InjectModel(Contract)
    private readonly contract: typeof Contract,
  ) {}

  async getAll(): Promise<Contract[]> {
    return await this.contract.findAll();
  }

  async getOne(id: string): Promise<Contract> {
    return await this.contract.findOne({ where: { id } });
  }

  async getOneByUser(userId: string): Promise<Contract> {
    return await this.contract.findOne({ where: { userId } });
  }
  async create(data: CreateContractRequestDto): Promise<Contract> {
    return await this.contract.create(data);
  }

  async update(id: string, data: UpdateContractRequestDto): Promise<Contract> {
    const updatedData = await this.contract.update(
      {
        ...data,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse<Contract>(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.contract.destroy({
      where: { id },
    });
  }
}
