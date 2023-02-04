import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { Injectable } from '@nestjs/common'
import { catchError, lastValueFrom, map } from 'rxjs'

@Injectable()
export class MempoolSpaceRepository {
  source = 'Mempool.space'
  baseUrl: string = 'https://mempool.space/api/v1/lightning'
  baseUrlTestnet: string = 'https://mempool.space/testnet/api'

  constructor(private readonly httpService: HttpService) {}

  async getNetworkStatistics() {
    const url = `${this.baseUrl}/statistics/latest`

    return lastValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<any>): any => {
          const { latest } = response.data
          return latest
        }),
        catchError(async (err) => {
          console.error(url, err)
          return null
        }),
      ),
    )
  }

  async getTopNodes() {
    const url = `${this.baseUrl}/nodes/rankings`

    return lastValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<any>): any => {
          return response.data
        }),
        catchError(async (err) => {
          console.error(url, err)
          return null
        }),
      ),
    )
  }

  async getNode({ pubKey }) {
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
          catchError(async (err) => {
            console.error(url, err)
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
        catchError(async (err) => {
          console.error(url, err)
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
        catchError(async (err) => {
          console.error(url, err)
          return null
        }),
      ),
    )

    const [node, channels] = await Promise.all([node_promise, channels_promise])
    channels.sort((a, b) => b.capacity - a.capacity).splice(10)

    node.channels = channels

    return node
  }
}
