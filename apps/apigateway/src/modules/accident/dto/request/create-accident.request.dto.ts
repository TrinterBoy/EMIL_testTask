import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { AccidentStatus } from 'src/models';

export class CreateAccidentRequestDto {
  @ApiProperty({ description: 'Accident description', example: '' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Accident description', example: '' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'User Id',
    example: '71a5eb19-293d-41a5-be3c-37b0169f9f10',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Contact Id',
    example: '71a5eb19-293d-41a5-be3c-37b0169f9f10',
  })
  @IsString()
  @IsNotEmpty()
  contractId: string;

  @ApiProperty({
    description: 'Array of victims',
    example: '["Alex Dudnyk", "Jein Dudnyk"]',
  })
  @IsString({ each: true })
  victims: string[];

  @ApiProperty({ description: 'Accident status ', example: AccidentStatus.UNDER_CONSIDERATION })
  @IsEnum(AccidentStatus)
  status: AccidentStatus;
}
