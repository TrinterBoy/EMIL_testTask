import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserResponseDto } from '../user/dto';
import {
  SignInRequestDto,
  SignUpRequestDto,
  UpdatePasswordRequestDto,
} from './dto';
import { TokenInterceptor } from '../../shared/interseptors';
import { AuthUser } from '../../shared/decorators';
import { User } from '../../../../../libs/global/src/shared/models';
import { AuthGuard } from '../../shared/guards';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Registration' })
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Successfully created user',
  })
  @ApiBadRequestResponse({ description: 'Incorrect registration data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(
    @Body() signUpDto: SignUpRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.registration(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Login' })
  @UseInterceptors(TokenInterceptor)
  async login(@Body() signInDto: SignInRequestDto): Promise<UserResponseDto> {
    return await this.authService.login(signInDto);
  }

  @Post('password-change')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Password change' })
  async passwordChange(
    @AuthUser() user: User,
    @Body() dto: UpdatePasswordRequestDto,
  ): Promise<void> {
    await this.authService.changePassword(user.id, dto);
  }
}
