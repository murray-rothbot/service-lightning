import { Injectable } from '@nestjs/common'
import { MempoolSpaceRepository } from './repositories'

@Injectable()
export class LightningService {
  constructor(private readonly mempoolspaceRepository: MempoolSpaceRepository) {}

  async getNetworkStatistics() {
    return this.mempoolspaceRepository.getNetworkStatistics()
  }

  getTopNodes() {
    return this.mempoolspaceRepository.getTopNodes()
  }

  async getNode(params) {
    return this.mempoolspaceRepository.getNode(params)
  }
}
