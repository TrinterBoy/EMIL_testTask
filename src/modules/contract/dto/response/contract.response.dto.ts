import { ApiProperty } from '@nestjs/swagger';
import { Contract } from 'src/models';
import { Expose, plainToClass } from 'class-transformer';

export class ContractResponseDto {
  @ApiProperty()
  @Expose()
  id: string;


  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  notes?: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  compensation: number;

  @ApiProperty()
  @Expose()
  expireDate: Date;

  public static mapFrom(data: Contract): ContractResponseDto {
    return plainToClass(ContractResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: Contract[]): ContractResponseDto[] {
    return data.map(ContractResponseDto.mapFrom);
  }
}
