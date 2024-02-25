import { Controller, Get, Param } from '@nestjs/common'
import { LightningService } from './lightning.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NodeRequestDto, NodeResponseDto, StatisticsResponseDto, TopResponseDto } from './dto'

@Controller('')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @ApiOperation({
    summary: 'Get lightning network statistics.',
  })
  @ApiTags('Lightning')
  @Get('/statistics')
  @ApiOkResponse({ type: StatisticsResponseDto })
  async getStatistics(): Promise<StatisticsResponseDto> {
    return await this.lightningService.getStatistics()
  }

  @ApiOperation({
    summary: 'Get top lightning network nodes.',
  })
  @ApiTags('Lightning')
  @Get('/top')
  @ApiOkResponse({ type: TopResponseDto })
  async getTopNodes(): Promise<TopResponseDto> {
    return await this.lightningService.getTopNodes()
  }

  @ApiOperation({
    summary: 'Get lightning network node information.',
  })
  @ApiTags('Lightning')
  @Get('/node/:pubKey')
  @ApiOkResponse({ type: NodeResponseDto })
  async getNode(@Param() params: NodeRequestDto): Promise<NodeResponseDto> {
    return await this.lightningService.getNode({ ...params })
  }
}
