import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../../models';
import { SignUpRequestDto } from '../auth/dto';
import { UpdateUserRequestDto } from './dto';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.getOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    return user;
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.userRepository.changePassword(id, password);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneEmail(email);

    return user || null;
  }

  async create(data: SignUpRequestDto): Promise<User> {
    const userEmailCheck = await this.findByEmail(data.email);
    if (userEmailCheck) {
      throw new ConflictException(`Error create new user`);
    }
    return await this.userRepository.create(data);
  }

  async update(id: string, dto: UpdateUserRequestDto): Promise<User> {
    const user: User = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    return await this.userRepository.update(id, dto,);
  }

  async delete(id: string): Promise<string | void> {
    const user = await this.userRepository.getOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any user with id: ${id}`);
    }
    return await this.userRepository.delete(user.id);
  }

}
