
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as util from 'node:util';
import * as crypto from 'node:crypto';
import { UserRepository } from '@app/global/shared/repositories';
import { User } from '@app/global/shared/models';
import { JwtPayload } from '@app/global/shared/interfaces';
import { appConfig } from '../../apigateway/src/configs';
import { PasswordChangeRequestDto, SingInRequestDto, SingUpRequestDto } from '@app/global/shared/types/auth';

const encryptIterations = 50_000;
const encryptKeyLength = 64;
const secret = appConfig.getAppSecret()
const encryptDigest = 'sha512';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: SingUpRequestDto): Promise<User> {
    dto.password = await this.encryptPassword(dto.password);

   return  await this.userRepository.create(dto);
  }

  async login(dto: SingInRequestDto): Promise<User> {
    const user: User = await this.userRepository.findOneEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Incorrect password or email');
    }

    if (!(await this.checkPassword(dto.password, user.password))) {
      throw new UnauthorizedException('Incorrect password or email');
    }
    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userRepository.findOneEmail(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    delete user.password;

    return user;
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
    dto: PasswordChangeRequestDto,
  ): Promise<void> {
    const user = await this.userRepository.getOne(userId);
    if (!(await this.checkPassword(dto.oldPassword, user.password))) {
      throw new UnauthorizedException('Incorrect password');
    }
    dto.newPassword = await this.encryptPassword(dto.newPassword);
    await this.userRepository.changePassword(userId, dto.newPassword);
  }
}
