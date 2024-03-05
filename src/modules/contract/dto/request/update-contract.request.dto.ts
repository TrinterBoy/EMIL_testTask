import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class UpdateContractRequestDto {
  @ApiProperty({ description: 'Accident description', example: '' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Accident description', example: '' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'User Id',
    example: '71a5eb19-293d-41a5-be3c-37b0169f9f10',
  })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Compensation',
    example: '3000',
  })
  @IsOptional()
  @IsNumber()
  compensation: number;

  @ApiProperty({
    description: 'contract expire date (rrrr-mm-dd)',
    example: '2024-03-05',
  })
  @IsOptional()
  @IsDateString()
  expireDate: Date;
}
