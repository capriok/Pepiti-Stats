interface MXBServer {
  id: string
  name: string
  address: string
  private_address: string
  dedicated: string
  password: string
  clients?: any[]
  num_clients: string
  max_clients: string
  track_id: string
  track_layout: string
  track_name: string
  track_link?: string
  category: string
  allowed_bikes: string
  event_type: string
  practice_length: string
  prequalify_length: string
  warmup_length: string
  race_prestart: string
  race_length: string
  race_length_format: string
  race_extra_laps: string
  session: string
  realistic_weather: string
  conditions: string
  force_cockpit: string
  no_aids: string
  limited_tyre_sets: string
  rating: string
  event: {
    type: string
    session: string
    race_type: string
  }
  weather_text: string
  weather_icon: string
  hardcore: {
    force_cockpit: string
    limited_tyre_sets: string
    no_aids: string
  }
}
