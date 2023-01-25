import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/env.config'
import { LightningModule } from './domain/lightning/lightning.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    LightningModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
