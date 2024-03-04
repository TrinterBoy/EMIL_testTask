import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as util from 'node:util';
import * as crypto from 'node:crypto';
import { SignInRequestDto, SignUpRequestDto, UpdatePasswordRequestDto } from './dto';
import { User } from 'src/models';
import { JwtPayload } from 'src/shared/interfaces';
import { UserService } from '../user/user.service';
import { UserResponseDto } from '../user/dto';
import { appConfig } from '../../configs';

const encryptIterations = 50_000;
const encryptKeyLength = 64;
const secret = appConfig.getAppSecret()
const encryptDigest = 'sha512';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: SignUpRequestDto): Promise<UserResponseDto> {
    dto.password = await this.encryptPassword(dto.password);

    const user = await this.userService.create(dto);

    return UserResponseDto.mapFrom(user);
  }

  async login(dto: SignInRequestDto): Promise<UserResponseDto> {
    const user: User = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    if (!(await this.checkPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password or email');
    }
    return UserResponseDto.mapFrom(user);
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findByEmail(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload, {secret});
  }

  private async encryptPassword(plainPassword: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(
      plainPassword,
      salt,
      encryptIterations,
      encryptKeyLength,
      encryptDigest,
    );

    return salt + ':' + encryptedPassword.toString('hex');
  }

  private async checkPassword(
    password: string,
    existPassword: string,
  ): Promise<boolean> {
    const [salt, key] = existPassword.split(':');

    const crypt = util.promisify(crypto.pbkdf2);

    const encryptedPassword = await crypt(
      password,
      salt,
      encryptIterations,
      encryptKeyLength,
      encryptDigest,
    );
    return key === encryptedPassword.toString('hex');
  }

  async changePassword(
    userId: string,
    dto: UpdatePasswordRequestDto,
  ): Promise<void> {
    const user = await this.userService.findById(userId);
    if (!(await this.checkPassword(dto.oldPassword, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }
    dto.newPassword = await this.encryptPassword(dto.newPassword);
    await this.userService.changePassword(userId, dto.newPassword);
  }
}
