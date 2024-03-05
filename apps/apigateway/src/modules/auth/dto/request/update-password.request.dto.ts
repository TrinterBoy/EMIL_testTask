import { IsDefined, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { minLengthAuthValidation } from 'src/shared/constants';

export class UpdatePasswordRequestDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(minLengthAuthValidation)
  oldPassword: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(minLengthAuthValidation)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPassword: string;
}
