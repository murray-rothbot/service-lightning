import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LightningService } from './lightning.service'
import { LightningController } from './lightning.controller'
import { MempoolSpaceRepository } from './repositories'

@Module({
  controllers: [LightningController],
  imports: [HttpModule],
  providers: [LightningService, MempoolSpaceRepository],
})
export class LightningModule {}
