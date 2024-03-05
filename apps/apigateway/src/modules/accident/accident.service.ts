import { Injectable, NotFoundException } from '@nestjs/common';
import { AccidentRepository } from '@app/global/shared/repositories/accident.repository';
import { Accident } from '../../../../../libs/global/src/shared/models';
import { CreateAccidentRequestDto, UpdateAccidentRequestDto } from './dto';

@Injectable()
export class AccidentService {
  constructor(private readonly accidentRepository: AccidentRepository) {}

  async getAll(): Promise<Accident[]> {
    return await this.accidentRepository.getAll();
  }

  async findById(id: string): Promise<Accident> {
    const user = await this.accidentRepository.getOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any accident with id: ${id}`);
    }
    return user;
  }

  async findByUser(userId: string): Promise<Accident> {
    const accident = await this.accidentRepository.getOneByUser(userId);
    return accident || null;
  }

  async create(data: CreateAccidentRequestDto): Promise<Accident> {
    return await this.accidentRepository.create(data);
  }

  async update(id: string, dto: UpdateAccidentRequestDto): Promise<Accident> {
    const accident: Accident = await this.findById(id);
    if (!accident) {
      throw new NotFoundException(`There isn't any accident with id: ${id}`);
    }
    return await this.accidentRepository.update(id, dto);
  }

  async delete(id: string): Promise<string | void> {
    const user = await this.accidentRepository.getOne(id);
    if (!user) {
      throw new NotFoundException(`There isn't any accident with id: ${id}`);
    }
    return await this.accidentRepository.delete(user.id);
  }
}
