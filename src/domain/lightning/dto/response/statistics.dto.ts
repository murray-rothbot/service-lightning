class StatisticsData {
  id: number
  added: string // ISO 8601 date format
  channel_count: number
  node_count: number
  total_capacity: number
  tor_nodes: number
  clearnet_nodes: number
  unannounced_nodes: number
  avg_capacity: number
  avg_fee_rate: number
  avg_base_fee_mtokens: number
  med_capacity: number
  med_fee_rate: number
  med_base_fee_mtokens: number
  clearnet_tor_nodes: number
}

export class StatisticsResponseDto {
  data: {
    latest: StatisticsData
    previous: StatisticsData
  }
}
