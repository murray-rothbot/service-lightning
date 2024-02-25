import { Injectable } from '@nestjs/common'
import { MempoolSpaceRepository } from './repositories'
import { NodeResponseDto, StatisticsResponseDto, TopResponseDto } from './dto'

@Injectable()
export class LightningService {
  constructor(private readonly mempoolSpaceRepository: MempoolSpaceRepository) {}

  async getStatistics(): Promise<StatisticsResponseDto> {
    return this.mempoolSpaceRepository.getStatistics()
  }

  async getTopNodes(): Promise<TopResponseDto> {
    return this.mempoolSpaceRepository.getTopNodes()
  }

  async getNode({ pubKey }): Promise<NodeResponseDto> {
    return this.mempoolSpaceRepository.getNode({ pubKey })
  }
}
