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

interface WorldRecords {
  [key: string]: {
    name: string
    total: number
  }
}

interface TopRecordData {
  _id: string
  MMR: number
  SR: number
  name: string
  contact: number
  donation: number
  laps: number
  banned: boolean
  banned_by: null | string
}

interface MMR {
  BPP: number
  PRB: number
  NRB: number
  total: number
}
interface FastestLap {
  '@Num': number
  RaceNum: number
  Pos: number
  LapTime: number | string
  Lap: number
  Gap: number
  Speed: number | undefined
}

interface Classification {
  RaceNum: 'string'
  Pos: number
  Status: string
  RaceTime: number
  Laps: number
  Lapped: string
  Gap: number
  Penalty: number
}

interface Race {
  MMR: { [key: string]: MMR }
  FastestLap: { [key: string]: FastestLap }
  Classification: { [key: string]: Classification }
}

interface LeagueRace {
  _id: string
  by: string
  league_id: string
  timestamp: number
  division_by: string
  config: {
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
  status: number
  riders_guid: string[]
  total_riders: number
  divisions: {
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
        average_speed: number
        bike: string
        lap_time: number
        rider_name: string
        split_1: number
        split_2: number
        air_temp: number
        conditions: string
        race_id: string
        session: string
      }
    }[]
  }[]
}

interface RaceData {
  _id: string
  Warmup: RaceTypeData
  by: string
  event: {
    Type: string
    Name: string | null
    Date: number
  }
  riders: {
    [key: string]: RiderSearch
  }
  riders_guid: Array<string>
  track: string
  Race1: RaceTypeData
  Race2: RaceTypeData
}

type RaceTypeData = {
  wheater: {
    air_temp: number
    conditions: string
  }
} & Classification &
  MMR &
  FastestLap

interface FastestLap {
  [key: string]: number
}

interface MMR {
  [key: string]: {
    BPP: number
    old_MMR: number
    PRB: number
    NRB: number
    FL: number
    total: number
  }
}

interface Classification {
  [key: string]: {
    '@Num': number
    RaceNum: number
    Pos: number
    Status: string
    RaceTime: string | number
    Laps: number
    Lapped: string | number
    Gap: number
    Penalty: number
    guid: string
  }
}

interface RiderSearch {
  race_number: number
  name: string
  bike_name: string
  bike_short_name: string
  category: string
  guid: string
  extra_data: string
  empty: string
}

interface LeagueData {
  _id: string
  by: string
  logo: string
  trophy: string
  name: string
  description: string
  verified: boolean
  hidden: boolean
  keep_bike_selection: true
  total_riders: number
  riders: {
    [key: string]: LeagueRider
  }
  requirements: LeagueRequirements
  races: Array<LeagueRace>
}

type LeagueRace = {
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

type LeagueRider = {
  guid: string
  team: string
  bike_id: string
  race_number: number
  name: string
  points: number
}

type LeagueRequirements = {
  [key: string]: number
  MMR: number
  SR: number
  races: number
  laps: number
  records: number
}
