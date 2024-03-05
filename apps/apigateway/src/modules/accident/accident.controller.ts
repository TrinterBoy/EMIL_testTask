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
  Delete, Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AccidentResponseDto, CreateAccidentRequestDto, UpdateAccidentRequestDto } from './dto';
import { AccidentService } from './accident.service';

@Controller('accident')
@ApiTags('Accidents')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AccidentController {
  constructor(private readonly accidentService: AccidentService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Create accident' })
  @ApiOkResponse({ type: AccidentResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body() accidentData: CreateAccidentRequestDto,
  ): Promise<AccidentResponseDto> {
    return await this.accidentService.create(accidentData);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update accident' })
  @ApiOkResponse({ type: AccidentResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any accident with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseUUIDPipe) accidentId: string,
    @Body() accidentData: UpdateAccidentRequestDto,
  ): Promise<AccidentResponseDto> {
    return await this.accidentService.update(accidentId, accidentData);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by Id accident' })
  @ApiOkResponse({ type: AccidentResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(
    @Param('id', ParseUUIDPipe) accidentId: string,
  ): Promise<AccidentResponseDto> {
    const accident = await this.accidentService.findById(accidentId);
    return AccidentResponseDto.mapFrom(accident);
  }

  @Get()
  @ApiOperation({ description: 'Get all accidents' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AccidentResponseDto, isArray: true })
  public async getAll(): Promise<AccidentResponseDto[]> {
    const accidents = await this.accidentService.getAll();
    return AccidentResponseDto.mapFromMulti(accidents);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete accident' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: `There isn't any accident with id` })
  async delete(@Param('id', ParseUUIDPipe) accidentId: string): Promise<void> {
    await this.accidentService.delete(accidentId);
  }
}
