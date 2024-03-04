import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserRequestDto {

  @ApiPropertyOptional({
    description: 'User email',
    example: 'email@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'User FirstName', example: 'Alex' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: 'User LastName', example: 'Dudnyk' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  surName?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+380990306686',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({
    description: 'User passport code',
    example: 'P4366918',
  })
  @IsOptional()
  @IsString()
  passportCode?: string;
}
