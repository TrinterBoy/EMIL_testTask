import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UpdateUserRequestDto,
  UserResponseDto,
} from './dto';
import { User } from 'src/models';
import { AuthGuard } from 'src/shared/guards';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any user with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() userData: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const user: User = await this.usersService.update(userId, userData);
    return UserResponseDto.mapFrom(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by ID user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(userId);
    return UserResponseDto.mapFrom(user);
  }

  @Get()
  @ApiOperation({ description: 'Get all user' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  public async getAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.getAll();
    return UserResponseDto.mapFromMulti(users);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete user' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: `There isn't any user with id` })
  async delete(@Param('id', ParseUUIDPipe) userId: string): Promise<void> {
    await this.usersService.delete(userId);
  }
}
