import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { Accident, AccidentStatus } from 'src/models';

export class AccidentResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  contractId: string;

  @ApiProperty()
  @Expose()
  victims: string;

  @ApiProperty()
  @Expose()
  status: AccidentStatus;

  public static mapFrom(data: Accident): AccidentResponseDto {
    return plainToClass(AccidentResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  public static mapFromMulti(data: Accident[]): AccidentResponseDto[] {
    return data.map(AccidentResponseDto.mapFrom);
  }
}
