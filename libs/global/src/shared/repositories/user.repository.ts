import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import { SignUpRequestDto } from '../../../../../apps/apigateway/src/modules/auth/dto';
import { UpdateUserRequestDto } from '../../../../../apps/apigateway/src/modules/user/dto';
import { mappingUpdateResponse } from 'src/shared/helpers';

export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly user: typeof User,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.user.findAll();
  }

  async getOne(id: string): Promise<User> {
    return await this.user.findOne({ where: { id } });
  }

  async findOneEmail(email: string): Promise<User> {
    return await this.user.findOne({
      where: {
        email,
      },
    });
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.user.update(
      {
        password,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async create(data: SignUpRequestDto): Promise<User> {
    return await this.user.create(data);
  }

  async update(id: string, data: UpdateUserRequestDto): Promise<User> {
    const updatedData = await this.user.update(
      {
        ...data,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return mappingUpdateResponse<User>(updatedData);
  }

  async delete(id: string): Promise<void> {
    await this.user.destroy({
      where: { id },
    });
  }
}
