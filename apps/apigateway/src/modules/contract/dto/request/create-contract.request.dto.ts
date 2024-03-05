import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateContractRequestDto {
  @ApiProperty({ description: 'Contract description', example: '' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Contract notes', example: '' })
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
    description: 'Compensation',
    example: '3000',
  })
  @IsNumber()
  @IsNotEmpty()
  compensation: number;

  @ApiProperty({
    description: 'Contract expire date (rrrr-mm-dd)',
    example: '2024-03-05',
  })
  @IsDateString()
  expireDate: Date;
}
