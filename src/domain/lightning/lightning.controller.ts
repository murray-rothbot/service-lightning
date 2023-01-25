import { Controller, Get, Param } from '@nestjs/common'
import { LightningService } from './lighning.service'

@Controller('')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Get('/statistics')
  async getStatistics() {
    return this.lightningService.getNetworkStatistics()
  }

  @Get('/top')
  async getTopNodes() {
    return this.lightningService.getTopNodes()
  }

  @Get('/node/:pubKey')
  async getNode(@Param() params) {
    return this.lightningService.getNode({ ...params })
  }
}
