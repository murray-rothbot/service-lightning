export class Feature {
  bit: number
  name: string
  is_required: boolean
  is_known: boolean
}

export class NodeCountry {
  de: string
  en: string
  es: string
  fr: string
  ja: string
  pt_BR: string
  ru: string
  zh_CN: string
}

export class ChannelNode {
  alias: string
  public_key: string
  channels: number
  capacity: string
}

export class Channel {
  status: number
  closing_reason: string | null
  closing_date: string | null
  capacity: number
  short_id: string
  id: string
  fee_rate: number
  node: ChannelNode
}

export class NodeData {
  public_key: string
  alias: string
  first_seen: number
  updated_at: number
  color: string
  sockets: string
  as_number: number
  city_id: number | null
  country_id: number
  subdivision_id: number | null
  longitude: number
  latitude: number
  iso_code: string
  as_organization: string
  city: string | null
  country: NodeCountry
  subdivision: string | null
  features: Feature[]
  featuresBits: string
  active_channel_count: number
  capacity: string
  opened_channel_count: number
  closed_channel_count: number
  custom_records: Record<string, unknown>
  channels: Channel[]
}

export class NodeResponseDto {
  data: NodeData
}
