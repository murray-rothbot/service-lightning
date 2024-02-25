export class NodeInfo {
  publicKey: string
  alias: string
  capacity?: number // Present in topByCapacity
  channels?: number // Present in topByChannels
  city?: { [key: string]: string } | null
  country: {
    de: string
    en: string
    es: string
    fr: string
    ja: string
    pt_BR: string
    ru: string
    zh_CN: string
  }
  iso_code: string
  subdivision?: { [key: string]: string } | null
}

export class TopResponseDto {
  data: {
    topByCapacity: NodeInfo[]
    topByChannels: NodeInfo[]
  }
}
