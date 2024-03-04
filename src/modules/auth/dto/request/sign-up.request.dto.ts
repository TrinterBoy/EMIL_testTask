import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { minLengthAuthValidation } from 'src/shared/constants';
import { Match } from 'src/shared/decorators';

export class SignUpRequestDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly surName: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(minLengthAuthValidation)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(minLengthAuthValidation)
  @Match('password')
  passwordConfirm: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsOptional()
  passportCode: string;
}
