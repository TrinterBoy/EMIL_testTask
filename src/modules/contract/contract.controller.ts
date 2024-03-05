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
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  ContractResponseDto,
  CreateContractRequestDto,
  UpdateContractRequestDto,
} from './dto';
import { AuthGuard } from 'src/shared/guards';
import { ContractService } from './contract.service';

@Controller('contract')
@ApiTags('Contracts')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Create contract' })
  @ApiOkResponse({ type: ContractResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(
    @Body() contractData: CreateContractRequestDto,
  ): Promise<ContractResponseDto> {
    return await this.contractService.create(contractData);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update contract' })
  @ApiOkResponse({ type: ContractResponseDto })
  @ApiNotFoundResponse({ description: `There isn't any contract with id` })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id', ParseUUIDPipe) contractId: string,
    @Body() contractData: UpdateContractRequestDto,
  ): Promise<ContractResponseDto> {
    return await this.contractService.update(contractId, contractData);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Find by Id contract' })
  @ApiOkResponse({ type: ContractResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async findById(
    @Param('id', ParseUUIDPipe) contractId: string,
  ): Promise<ContractResponseDto> {
    const contract = await this.contractService.findById(contractId);
    return ContractResponseDto.mapFrom(contract);
  }

  @Get()
  @ApiOperation({ description: 'Get all contracts' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ContractResponseDto, isArray: true })
  public async getAll(): Promise<ContractResponseDto[]> {
    const contracts = await this.contractService.getAll();
    return ContractResponseDto.mapFromMulti(contracts);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete contract' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: `There isn't any contract with id` })
  async delete(@Param('id', ParseUUIDPipe) contractId: string): Promise<void> {
    await this.contractService.delete(contractId);
  }
}
