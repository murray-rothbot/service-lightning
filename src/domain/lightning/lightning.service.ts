import { Injectable } from '@nestjs/common'
import { MempoolSpaceRepository } from './repositories'

@Injectable()
export class LightningService {
  constructor(private readonly mempoolSpaceRepository: MempoolSpaceRepository) {}

  async getNetworkStatistics() {
    return this.mempoolSpaceRepository.getNetworkStatistics()
  }

  getTopNodes() {
    return this.mempoolSpaceRepository.getTopNodes()
  }

  async getNode(params) {
    return this.mempoolSpaceRepository.getNode(params)
  }
}
