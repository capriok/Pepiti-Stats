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
  seasons: LeaguesSeason[]
  races: {
    first: number
    second: number
    third: number
    total_races: number
    fastlap: number
    holeshot: number
  }
}

interface LeaguesSeason {
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

interface RiderMMRUpdates {
  _id: string
  MMR_updates: RiderMMRHistory[]
}

interface RiderMMRHistory {
  timestamp: number
  mmr: number
  type: string
}

interface RecentRace {
  _id: string
  by: string
  track: string
}

interface TrackRecords {
  track: Track
  records: TrackRecord[]
  total_records: number
}

interface Track {
  _id: string
  name: string
  laps: number
  wr: {
    'MX2 OEM'?: TrackRecord
    'MX1 OEM'?: TrackRecord
    'MX2-2T OEM'?: TrackRecord
    'MX1-2T OEM'?: TrackRecord
    'MX3 OEM'?: TrackRecord
  }
}

interface TrackRecord {
  _id: string
  category: string
  rider_guid: string
  track: string
  air_temp: number
  average_speed: number
  bike: string
  conditions: string
  lap_time: number
  race_id: string
  rider_name: string
  session: string
  split_1: number
  split_2: number
  race_number?: number
  timestamp?: number
  [key: string]: any
}
interface RaceSession {
  _id: string
  Warmup: {
    holeshot: null
    wheater: {
      air_temp: number
      conditions: string
    }
    Classification: {
      [key: string]: {
        RaceNum: string
        BestLap: number
        Pos: number
        Laps?: number
        TotalLaps?: number
        Gap?: number
        Speed?: string
      }
    }
    FastestLap: { [key: string]: number }
  }
  by: string
  event: {
    Type: string
    Name: null
    Date: number
  }
  riders: {
    [key: string]: {
      race_number: number
      name: string
      bike_name: string
      bike_short_name: string
      category: string
      guid: string
      extra_data: string
      empty: string
    }
  }
  riders_guid: string[]
  track: string
  Race1?: {
    holeshot: null
    wheater: Wheater
    Classification: { [key: string]: RaceClassification }
    FastestLap: { [key: string]: number }
    MMR: { [key: string]: Mmr }
  }
  Race2?: {
    holeshot: null
    wheater: Wheater
    Classification: { [key: string]: RaceClassification }
    FastestLap: { [key: string]: number }
    MMR: { [key: string]: Mmr }
  }
}

type ProcessedRaceSession = {
  name: null
  date: number
  type: string
  track: string
  headCount: number
  races: {
    warmup: Race | null
    race1: Race | null
    race2: Race | null
  }
}

type Race = {
  weather: Weather
  standings: Racer[]
  winner: Racer
}

type Weather = {
  conditions: string
  airTemp: number
}

type Racer = {
  _id: string
  name: string
  raceNumber: string
  bikeName: string
  bikeNameShort: string
  category: string
  guid: string
  position: number
  raceTime: number
  gap: number
  penalty: number
  laps: number
  fastestLap: string
  newMmr: number
  mmrGain: number
  bpp: number
  fl: number
  hs: number
  nrb: number
  prb: number
}
