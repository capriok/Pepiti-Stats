interface User {
  guid: string
  name: string
  avatar: string
  isAdmin: boolean
  token: string
}

interface SummaryStats {
  unique_riders: number
  records: number
  races: number
  laps: number
}

interface RiderSearch {
  _id: string
  MMR: number
  SR: number
  name: string
  contact: number
  banned: boolean
  banned_by: null | string
  avatar: string
  type: 'user'
  donation: number
  seasons: Season[]
  races: {
    first: number
    second: number
    third: number
    total_races: number
    fastlap: number
    holeshot: number
  }
}

interface Season {
  name: string
  MMR: number
  position: number
}

interface RiderProfile {
  _id: string
  avatar: string
  MMR: string
  SR: string
  name: string
  contact: number
  world_records: {
    [key: string]: number
    'MX1 OEM': number
    'MX1-2T OEM': number
    'MX2 OEM': number
    'MX2-2T OEM': number
    'MX3 OEM': number
    'SM1 OEM': number
    'SM1-2t OEM': number
    'SM2 OEM': number
    'SM2-2t OEM': number
    total: number
  }
  total_laps: number
  favorite_bike: {
    name: string
    laps: number
  }
  average_speed: number
  banned: boolean
  banned_by: null | string
  type: 'admin' | string
  online: boolean
  donation: number
  races: {
    fastlap: number
    first: number
    holeshot: number
    second: number
    third: number
    total_races: number
  }
}

interface TrackRecord {
  _id: string
  category: string
  rider_guid: string
  track: string
  average_speed: number
  bike: string
  lap_time: number
  rider_name: string
  split_1: number
  split_2: number
  race_id?: string
}

interface RecentRace {
  _id: string
  by: string
  track: string
}

interface AllTracks {
  records: {
    _id: string
    name: string
    laps: number
    wr: {
      [key: string]: Omit<TrackRecord, '_id'>
    }
    records: TrackRecord[]
  }[]
}

interface Track {
  track: {
    _id: string
    name: string
    laps: number
    wr: {
      [key: string]: Omit<TrackRecord, '_id'>
    }
  }
  records: TrackRecord[]
  total_records: number
}

interface RaceSession {
  _id: string
  Warmup: Warmup
  by: string
  event: Event
  riders: { [key: string]: Rider }
  riders_guid: string[]
  track: string
  Race2: Race2
}

interface Race2 {
  holeshot: null
  wheater: Wheater
  Classification: { [key: string]: Race2Classification }
  FastestLap: { [key: string]: number }
  MMR: { [key: string]: Mmr }
}

interface Warmup {
  holeshot: null
  wheater: Wheater
  Classification: { [key: string]: Classification }
  FastestLap: { [key: string]: number }
}

interface Classification {
  RaceNum: string
  BestLap: number
  Pos: number
  Laps?: number
  TotalLaps?: number
  Gap?: number
  Speed?: string
}

interface Wheater {
  air_temp: number
  conditions: string
}

interface Event {
  Type: string
  Name: null
  Date: number
}

interface Rider {
  race_number: number
  name: string
  bike_name: string
  bike_short_name: string
  category: string
  guid: string
  extra_data: string
  empty: string
}
