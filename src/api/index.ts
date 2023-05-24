const ENDPOINT = process.env.NEXT_PUBLIC_PEPITI
const nextConfig = { next: { revalidate: 30 } }

export const fetcher = async (url: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
  })
  return res.json()
}

export const privateFetcher = async (url: string, token: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    credentials: 'include',
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return res.json()
}

const privatePoster = async (url: string, token: string, body?: any) => {
  const res = await fetch(ENDPOINT + url, {
    method: 'POST',
    body: JSON.stringify(body ?? {}),
    credentials: 'include',
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return res.json()
}

class PepitiApi {
  // STATS

  public async GetSummaryStats(): Promise<SummaryStats> {
    const data = await fetcher(`/summary`)
    return data
  }
  public async GetDynamicTopRecords(slug: string, limit: number): Promise<any> {
    const data = await fetcher(`/top/${slug}/${limit}`)
    return data
  }
  public async SearchForRider(term: string): Promise<{ results: Array<RiderSearch> }> {
    const data = await fetcher(`/rider/search/${term}`)
    return data
  }
  public async GetTrackNames() {
    const data = await fetcher(`/records/track_names`)
    return data
  }
  public async GetTrackRecords(track: string): Promise<Track> {
    const data = await fetcher(`/records/track/${track}`)
    return data
  }

  // RACES

  public async GetRecentRaces(): Promise<{ races: Array<RecentRace> }> {
    const data = await fetcher('/races')
    return data
  }
  public async GetRace(raceId: string): Promise<RaceSession> {
    const data = await fetcher(`/races/${raceId}`)
    return data
  }

  // RIDER

  public async GetRider(guid: string): Promise<RiderProfile> {
    const data = await fetcher(`/rider/${guid}`)
    return data
  }
  public async GetRiderRecords(guid: string): Promise<{ records: any }> {
    const data = await fetcher(`/rider/${guid}/records`)
    return data
  }
  public async GetRiderRaces(guid: string): Promise<{ races: any }> {
    const data = await fetcher(`/rider/${guid}/races`)
    return data
  }
  public async GetRiderMMRHistory(guid: string): Promise<RiderMMRUpdates> {
    const data = await fetcher(`/rider/${guid}/mmr_history`)
    return data
  }
  public async GetRiderLeagues(token: string): Promise<{ leagues: any[] }> {
    const data = await privateFetcher('/my_leagues', token)
    return data
  }

  // LEAGUES

  public async GetAllLeagues(): Promise<{ leagues: any }> {
    const data = await fetcher('/leagues')
    return data
  }
  public async GetLeague(leagueId: string, token: string): Promise<League> {
    const data = await privateFetcher(`/league/${leagueId}`, token)
    return data
  }
  public async GetLeagueRace(raceId: string, token: string): Promise<LeagueRaceDetails> {
    const data = await privateFetcher(`/race/${raceId}`, token)
    return data
  }
  public async GetLeagueEligibility(leagueId: string, token: string): Promise<any> {
    const data = await privateFetcher(`/league/${leagueId}/check`, token)
    return data
  }
  //prettier-ignore
  public async GetLeagueRaceEligibility(riderId: string, token: string, body: any): Promise<{ rider: any }> {
    const data = await privatePoster(`/rider/${riderId}/join`, token, body)
    return data
  }
  public async JoinLeague(leagueId: string, token: string, body: any): Promise<{ league: any }> {
    const data = await privatePoster(`/league/${leagueId}/join`, token, body)
    return data
  }
  public async JoinLeagueRace(riderId: string, token: string, body: any): Promise<{ rider: any }> {
    const data = await privatePoster(`/rider/${riderId}/join`, token, body)
    return data
  }
  public async LeaveLeagueRace(riderId: string, token: string, body: any): Promise<{ rider: any }> {
    const data = await privatePoster(`/rider/${riderId}/join`, token, body)
    return data
  }
  // league = {
  //   join: async (leagueId: string, body: any, token: string) => {
  //     const data = await postRequest(`/league/${leagueId}/join`, token, { data: 'data' })
  //     return data
  //   },
  //   check: async (leagueId: string, token: string) => {
  //     const data = await privateRequest(`/league/${leagueId}/check`, token)
  //     return data
  //   },
  // }

  // leagueRace = {
  //   get: async (raceId: string, token: string) => {
  //     const data = await privateRequest(`/race/${raceId}`, token)
  //     return data
  //   },
  //   join: async (raceId: string, token: string) => {
  //     const data = await postRequest(`/race/${raceId}/join`, token, { data: 'data' })
  //     return data
  //   },
  //   leave: async (raceId: string, token: string, body?: any) => {
  //     const data = await postRequest(`/race/${raceId}/leave`, token, { data: 'data' })
  //     return data
  //   },
  //   check: async (raceId: string, token: string) => {
  //     const data = await privateRequest(`/race/${raceId}/check`, token)
  //     return data
  //   },
  // }

  // ADMINISTRATION

  public async GetBlackListSR(): Promise<{ riders: any }> {
    const data = await fetcher('/blacklist.json')
    return data
  }

  public async GetBlackListNonSR(): Promise<{ riders: any }> {
    const data = await fetcher('/blacklist_non_sr.json ')
    return data
  }

  public async BanRider(guid: string, reason: string, token: string): Promise<any> {
    const data = await privateFetcher(`/rider/${guid}/ban/${reason}`, token)
    return data
  }

  public async UnBanRider(guid: string, token: string): Promise<any> {
    const data = await privateFetcher(`/rider/${guid}/unban`, token)
    return data
  }

  // AUTHENTICATION

  public Login(): string {
    const steam_login = 'https://pepiti.com/stats/api/v0/steam_login'
    return steam_login
  }

  public async Logout(): Promise<{ status: boolean }> {
    return { status: true }
  }
}

const Api = new PepitiApi()
export default Api
