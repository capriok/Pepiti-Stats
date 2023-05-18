const ENDPOINT = process.env.NEXT_PUBLIC_PEPITI
const nextConfig = { next: { revalidate: 10 } }

export const publicRequest = async (url: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
  })
  return res.json()
}

export const privateRequest = async (url: string, token: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return res.json()
}

// const postRequest = async (url: string, token: string, body: any) => {
//   const res = await fetch(ENDPOINT + url, {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   })
//   return res.json()
// }

class PepitiApi {
  // STATS

  public async GetSummaryStats(): Promise<SummaryStats> {
    const data = await publicRequest(`/summary`)
    return data
  }
  public async GetDynamicTopRecords(slug: string, limit: number): Promise<any> {
    const data = await publicRequest(`/top/${slug}/${limit}`)
    return data
  }
  public async SearchForRider(term: string): Promise<{ results: Array<RiderSearch> }> {
    const data = await publicRequest(`/rider/search/${term}`)
    return data
  }
  public async GetRecentRaces(): Promise<{ races: Array<RecentRace> }> {
    const data = await publicRequest('/races')
    return data
  }
  public async GetRace(raceId: string): Promise<Race> {
    const data = await publicRequest(`/races/${raceId}`)
    return data
  }
  public async GetTrackNames() {
    const data = await publicRequest(`/records/track_names`)
    return data
  }
  public async GetTrackRecords(track: string): Promise<Track> {
    const data = await publicRequest(`/records/track/${track}`)
    return data
  }

  // RIDER

  public async GetRider(guid: string): Promise<RiderProfile> {
    const data = await publicRequest(`/rider/${guid}`)
    return data
  }
  public async GetRiderRecords(guid: string): Promise<{ records: any }> {
    const data = await publicRequest(`/rider/${guid}/records`)
    return data
  }
  public async GetRiderRaces(guid: string): Promise<{ races: any }> {
    const data = await publicRequest(`/rider/${guid}/races`)
    return data
  }
  public async GetRiderMMRHistory(guid: string): Promise<{ _id: string; MMR_updates: Array<any> }> {
    const data = await publicRequest(`/rider/${guid}/mmr_history`)
    return data
  }

  // LEAGUES

  // public async GetAuthLeagues(token: string): Promise<{ leagues: any[] }> {
  //   const data = await privateRequest('/my_leagues', token)
  //   return data
  // }

  // public async GetLeagues(): Promise<{ leagues: LeagueData[] }> {
  //   const data = await publicRequest('/leagues')
  //   return data
  // }

  // public async GetLeague(leagueId: string, token: string): Promise<LeagueData> {
  //   const data = await privateRequest(`/league/${leagueId}`, token)
  //   return data
  // }

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

  public async BlackListSR(): Promise<{ records: any }> {
    const data = await publicRequest('/blacklist.json')
    return data
  }

  public async BlackListNonSR(): Promise<{ records: any }> {
    const data = await publicRequest('/blacklist_non_sr.json ')
    return data
  }

  public async BanRider(guid: string, reason: string, token: string): Promise<any> {
    const data = await privateRequest(`/rider/${guid}/ban/${reason}`, token)
    return data
  }

  public async UnBanRider(guid: string, token: string): Promise<any> {
    const data = await privateRequest(`/rider/${guid}/unban`, token)
    return data
  }

  // AUTHENTICATION

  public Login(): string {
    const steam_login = 'https://pepiti.com/stats/api/v0/steam_login'
    return steam_login
  }

  public async Logout(): Promise<{ status: boolean }> {
    return { status: false }
  }
}

const Api = new PepitiApi()
export default Api
