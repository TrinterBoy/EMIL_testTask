import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ description: 'User email', example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User FirstName', example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User LastName', example: 'Dudnyk' })
  @IsString()
  @IsNotEmpty()
  surName: string;

  @ApiProperty({ description: 'User phone number', example: '+380990306686' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'User passport code', example: 'P4366918' })
  @IsPhoneNumber()
  passportCode: string;
}
