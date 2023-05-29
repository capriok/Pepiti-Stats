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
  type: "user"
  donation: number
  seasons: LeagueSeason[]
  races: {
    first: number
    second: number
    third: number
    total_races: number
    fastlap: number
    holeshot: number
  }
}

interface LeagueSeason {
  name: string
  MMR: number
  position: number
}

interface RiderProfile {
  _id: string
  avatar: string
  MMR: number
  SR: number
  name: string
  contact: number
  world_records: RiderWorldRecords
  total_laps: number
  favorite_bike: {
    name: string
    laps: number
  }
  average_speed: number
  banned: boolean
  banned_by: null | string
  type: "admin" | string
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

interface RiderWorldRecords {
  [key: string]: number
  "MX1 OEM": number
  "MX1-2T OEM": number
  "MX2 OEM": number
  "MX2-2T OEM": number
  "MX3 OEM": number
  "SM1 OEM": number
  "SM1-2t OEM": number
  "SM2 OEM": number
  "SM2-2t OEM": number
  total: number
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
    "MX2 OEM"?: TrackRecord
    "MX1 OEM"?: TrackRecord
    "MX2-2T OEM"?: TrackRecord
    "MX1-2T OEM"?: TrackRecord
    "MX3 OEM"?: TrackRecord
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

interface ProcessedRaceSession {
  name: null
  date: number
  type: string
  track: string
  headCount: number
  races: {
    race1: Race | null
    race2: Race | null
  }
}

interface Race {
  weather: Weather
  standings: Racer[]
  winner: Racer
}

interface Weather {
  conditions: string
  airTemp: number
}

interface Racer {
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

interface League {
  _id: string
  by: string
  logo: string
  trophy: string
  name: string
  description: string
  verified: boolean
  hidden: boolean
  closed?: boolean
  keep_bike_selection: boolean
  keep_race_number: boolean
  total_riders: number
  riders: {
    [key: string]: LeagueRider
  }
  requirements: LeagueRequirements
  races: Array<LeagueRace>
}

interface LeagueEligibility {
  not_banned: boolean
  league_joined: boolean
  MMR: boolean
  SR: boolean
  races: boolean
  laps: boolean
  records: boolean
}

interface LeagueRace {
  _id: string
  timestamp: number
  config: {
    event: {
      category: string[]
      track: string
      track_layout: string
    }
  }
  status: number
  total_riders: number
  track_image_url: string
}

interface LeagueRider {
  guid: string
  name: string
  team: string
  bike_id: string
  race_number: number
  points?: number
  server_preference?: string
}

interface LeagueRequirements {
  [key: string]: number
  MMR: number
  SR: number
  races: number
  laps: number
  records: number
}

interface LeagueRaceEligibility {
  not_banned: boolean
  league_joined: boolean
  MMR: boolean
  SR: boolean
  races: boolean
  laps: boolean
  records: boolean
  race_joined: boolean
}

interface LeagueRaceDetails {
  _id: string
  by: string
  league_id: string
  timestamp: number
  division_by: string
  config: LeagueRaceConfig
  status: number
  riders_guid: string[]
  total_riders: number
  divisions: LeagueRaceDivision[]
}

interface LeagueRaceConfig {
  weather: {
    realistic: number
    conditions: number
    temperature: number
    wind_direction: number
    wind_speed: number
    track_conditions: number
  }
  connection: {
    maxclient: number
  }
  event: {
    category: string[]
    track: string
    track_layout: string
  }
  deformation: {
    scale: string
    auto_reset: number
  }
  polls: {
    disable_during_races: string
  }
  race: {
    format: number
    quick_race: number
    practice_length: number
    qualifypractice_length: number
    warmup_length: number
    race_length_format: number
    race_minutes: number
    race_extralaps: number
    restart_delay: number
  }
}

interface LeagueRaceDivision {
  name: string
  riders: {
    guid: string
    team: string
    bike_id: string
    race_number: number
    name: string
    record: {
      _id: string
      category: string
      rider_guid: string
      track: string
      air_temp?: number
      average_speed?: number
      bike?: string
      conditions?: string
      lap_time: number
      race_id?: string
      race_number: number
      rider_name: string
      session: string
      split_1?: number
      split_2?: number
      timestamp: number
    }
  }[]
}

interface RiderReport {
  _id: string
  reason: string
  proofs: string[]
  race: {
    _id: string
    Warmup: {
      holeshot: null
      wheater: {
        air_temp: number
        conditions: string
      }
      Classification: RaceClassification
      FastestLap: RaceFastestLap
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
    Race2: any
  }
  by: ReportRider
  rider: ReportRider
}

interface ReportRider {
  _id: string
  MMR: number
  SR: number
  name: string
  contact: number
  banned: boolean
  banned_by: string | null
  avatar: string
  type: string
  online: boolean
  server: string | null
  donation: number
  seasons: LeagueSeason[]
  races: {
    first: number
    second: number
    third: number
    total_races: number
    fastlap: number
    holeshot: number
  }
  bikes: {
    [key: string]: {
      laps: number
    }
  }
}

interface BlacklistRider {
  _id: string
  MMR: number
  SR: number
  name: string
  contact: number
  banned: boolean
  banned_by: string
  avatar: string
  type: string
  donation: number
  online: boolean
  server: null | string
  seasons: LeagueSeason[]
  races: {
    first: number
    second: number
    third: number
    total_races: number
    fastlap: number
    holeshot: number
  }
  bikes: {
    [key: string]: {
      laps: string
    }
  }
}
