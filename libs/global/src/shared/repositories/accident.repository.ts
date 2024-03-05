import { InjectModel } from '@nestjs/sequelize';
import { Accident } from 'src/models';
import { mappingUpdateResponse } from 'src/shared/helpers';
import { UpdateAccidentRequestDto, CreateAccidentRequestDto } from '../../../../../apps/apigateway/src/modules/accident/dto';

export class AccidentRepository {
  constructor(
    @InjectModel(Accident)
    private readonly accident: typeof Accident,
  ) {}

  async getAll(): Promise<Accident[]> {
    return await this.accident.findAll();
  }

  async getOne(id: string): Promise<Accident> {
    return await this.accident.findOne({ where: { id } });
  }

  async getOneByUser(userId: string): Promise<Accident> {
    return await this.accident.findOne({ where: { userId } });
  }
  async create(data: CreateAccidentRequestDto): Promise<Accident> {
    const newData = { ...data, victims: JSON.stringify(data.victims) };
    return await this.accident.create(newData);
  }

  async update(id: string, data: UpdateAccidentRequestDto): Promise<Accident> {
    const newData = {
      ...data,
      victims: data.victims ? JSON.stringify(data.victims) : '',
    };
    const updatedData = await this.accident.update(
      {
        ...newData,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse<Accident>(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.accident.destroy({
      where: { id },
    });
  }
}
