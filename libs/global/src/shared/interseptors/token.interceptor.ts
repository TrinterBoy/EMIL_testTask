import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/models';


@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<{ message: string }> {
    return next.handle().pipe(
      map((user) => {
        const response = context.switchToHttp().getResponse();
        const token = this.authService.signToken(user);

        response.header('Authorization', `Bearer ${token}`);

        return { message: 'Success' };
      }),
    );
  }
}
