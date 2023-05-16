const ENDPOINT = process.env.NEXT_PUBLIC_PEPITI

const publicRequest = async (url: string) => {
  const res = await fetch(ENDPOINT + url)
  const data = await res.json()
  return data
}

const privateRequest = async (url: string, token: string) => {
  const res = await fetch(ENDPOINT + url, {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return res.json()
}

const postRequest = async (url: string, token: string, body: any) => {
  const res = await fetch(ENDPOINT + url, {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
  return res.json()
}

class PepitiApi {
  public async GetSummaryStats(): Promise<SummaryStats> {
    const data = await publicRequest(`/summary`)
    return data
  }
  public async GetDynamicTopRecords(slug: string, limit: number): Promise<any> {
    const data = await publicRequest(`/top/${slug}/${limit}`)
    return data
  }

  public async SearchForRider(term: any) {
    const data = await publicRequest(`/rider/search/${term}`)
    return data
  }
  public async GetRider(guid: string): Promise<{ rider: any }> {
    const data = await publicRequest(`/rider/${guid}`)
    return { rider: data }
  }
  public async GetAuthRider(guid: string, token: string): Promise<{ rider: any }> {
    const data = await privateRequest(`/rider/${guid}`, token)
    return { rider: data }
  }
  public async GetRiderRecords(guid: string): Promise<{ records: any }> {
    const data = await publicRequest(`/rider/${guid}/records`)
    return data
  }
  public async GetRiderRaces(guid: string): Promise<{ races: any }> {
    const data = await publicRequest(`/rider/${guid}/races`)
    return data
  }
  public async GetRiderMMRHistory(guid: string): Promise<{ history: any }> {
    const data = await publicRequest(`/rider/${guid}/mmr_history`)
    return data
  }
  public async GetRecentRaces(): Promise<{ records: any }> {
    const data = await publicRequest('/races')
    return data
  }
  public async GetRace(raceId: string): Promise<any> {
    const data = await publicRequest(`/races/${raceId}`)
    return data
  }
  public async GetTrackNames() {
    const data = await publicRequest(`/records/track_names`)
    return data
  }
  public async GetTrackRecords(slug: string): Promise<{
    records: any
    total_records: any
    track: any
  }> {
    'use server'
    const data = await publicRequest(`/records/track/${slug}`)
    return data
  }

  public async GetAuthLeagues(token: string): Promise<{ leagues: any[] }> {
    const data = await privateRequest('/my_leagues', token)
    return data
  }

  public async GetLeagues(): Promise<{ leagues: LeagueData[] }> {
    const data = await publicRequest('/leagues')
    return data
  }

  public async GetLeague(leagueId: string, token: string): Promise<LeagueData> {
    const data = await privateRequest(`/league/${leagueId}`, token)
    return data
  }

  league = {
    join: async (leagueId: string, body: any, token: string) => {
      const data = await postRequest(`/league/${leagueId}/join`, token, { data: 'data' })
      return data
    },
    check: async (leagueId: string, token: string) => {
      const data = await privateRequest(`/league/${leagueId}/check`, token)
      return data
    },
  }

  leagueRace = {
    get: async (raceId: string, token: string) => {
      const data = await privateRequest(`/race/${raceId}`, token)
      return data
    },
    join: async (raceId: string, token: string) => {
      const data = await postRequest(`/race/${raceId}/join`, token, { data: 'data' })
      return data
    },
    leave: async (raceId: string, token: string, body?: any) => {
      const data = await postRequest(`/race/${raceId}/leave`, token, { data: 'data' })
      return data
    },
    check: async (raceId: string, token: string) => {
      const data = await privateRequest(`/race/${raceId}/check`, token)
      return data
    },
  }

  public Login(): string {
    const steam_login = 'https://pepiti.com/stats/api/v0/steam_login'
    return steam_login
  }

  public async Logout(): Promise<{ status: boolean }> {
    return { status: false }
  }

  public async BlackListSR(): Promise<{ records: any }> {
    const data = await publicRequest('/blacklist.json')
    return data
  }

  public async BlackListNonSR(): Promise<{ records: any }> {
    const data = await publicRequest('/blacklist_non_sr.json ')
    return data
  }
}

const Api = new PepitiApi()
export default Api
