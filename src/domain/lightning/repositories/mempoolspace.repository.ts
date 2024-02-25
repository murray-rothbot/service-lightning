import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { Injectable, Logger } from '@nestjs/common'
import { catchError, lastValueFrom, map } from 'rxjs'
import { NodeResponseDto, StatisticsResponseDto, TopResponseDto } from '../dto'

@Injectable()
export class MempoolSpaceRepository {
  private readonly logger = new Logger(MempoolSpaceRepository.name)
  private baseUrl: string = 'https://mempool.space/api/v1/lightning'

  constructor(private readonly httpService: HttpService) {}

  async getStatistics(): Promise<StatisticsResponseDto> {
    const url = `${this.baseUrl}/statistics/latest`

    return lastValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<StatisticsResponseDto>): StatisticsResponseDto => {
          return response.data
        }),
        catchError(async () => {
          this.logger.debug(`GET NETWORK STATISTICS ${url}`)
          return null
        }),
      ),
    )
  }

  async getTopNodes(): Promise<TopResponseDto> {
    const url = `${this.baseUrl}/nodes/rankings`

    return lastValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<TopResponseDto>): TopResponseDto => {
          return response.data
        }),
        catchError(async () => {
          this.logger.debug(`GET TOP NODES ${url}`)
          return null
        }),
      ),
    )
  }

  async getNode({ pubKey }): Promise<NodeResponseDto> {
    if (pubKey.length !== 66) {
      const search_url = `${this.baseUrl}/search?searchText=${pubKey}`
      pubKey = await lastValueFrom(
        this.httpService.get(search_url).pipe(
          map((response: AxiosResponse<any>): any => {
            const { nodes } = response.data
            if (nodes.length === 0) return null
            const { public_key } = nodes[0]
            return public_key
          }),
          catchError(async () => {
            this.logger.debug(`GET NODE ${url}`)
            return null
          }),
        ),
      )
    }

    if (!pubKey) return null

    const url = `${this.baseUrl}/nodes/${pubKey}`
    const node_promise = lastValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<any>): any => {
          return response.data
        }),
        catchError(async () => {
          this.logger.debug(`GET NODE ${url}`)
          return null
        }),
      ),
    )

    const channels_url = `${this.baseUrl}/channels?public_key=${pubKey}&status=open`
    const channels_promise = lastValueFrom(
      this.httpService.get(channels_url).pipe(
        map((response: AxiosResponse<any>): any => {
          return response.data
        }),
        catchError(async () => {
          this.logger.debug(`GET NODE ${url}`)
          return null
        }),
      ),
    )

    const [node, channels] = await Promise.all([node_promise, channels_promise])
    channels
      .sort((a: { capacity: number }, b: { capacity: number }) => b.capacity - a.capacity)
      .splice(10)

    node.channels = channels

    return node
  }
}
