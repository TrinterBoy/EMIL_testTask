import { Controller, Get } from '@nestjs/common';
import {
  AuthServiceController,
  AuthServiceControllerMethods, PasswordChangeRequestDto,
  SingInRequestDto, SingUpRequestDto,
  SuccessMessage,
} from '@app/global/shared/types/auth';
import { Observable } from 'rxjs';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController{
  constructor(private readonly authService: AuthService) {}

  async signIn(request: SingInRequestDto): Promise<SuccessMessage> | Observable<SuccessMessage> | SuccessMessage {
      await this.authService.login(request)
      return {message: 'success'}
  }

  signUp(request: SingUpRequestDto): Promise<User> | Observable<User> | User {

  }

  passwordChange(request: PasswordChangeRequestDto): Promise<SuccessMessage> | Observable<SuccessMessage> | SuccessMessage {
  }

}
