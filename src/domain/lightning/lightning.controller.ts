import { Controller, Get, Param } from '@nestjs/common'
import { LightningService } from './lightning.service'
import { ApiTags } from '@nestjs/swagger'

@Controller('')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @ApiTags('Lightning')
  @Get('/statistics')
  async getStatistics() {
    return this.lightningService.getNetworkStatistics()
  }

  @ApiTags('Lightning')
  @Get('/top')
  async getTopNodes() {
    return this.lightningService.getTopNodes()
  }

  @ApiTags('Lightning')
  @Get('/node/:pubKey')
  async getNode(@Param() params) {
    return this.lightningService.getNode({ ...params })
  }
}
