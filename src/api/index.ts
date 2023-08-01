"use server"

import { cookies } from "next/headers"
import jwt_decode from "jwt-decode"

const ENDPOINT = process.env.NEXT_PUBLIC_API
const nextConfig = { next: { revalidate: 30 } }

const fetcher = async (url: string, token?: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
  return res.json()
}

export default async function GetAuthUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("access_token")?.value

  try {
    const decode: SteamUser = jwt_decode(token!) ?? {}
    const user = await fetcher(`/rider/${decode._id}`)

    if (decode._id !== user._id) return makeUser({})

    return makeUser({ ...user, token: token })
  } catch (error) {
    return makeUser({})
  }
}

export async function GetSummaryStats(): Promise<SummaryStats> {
  const data = await fetcher(`/summary`)
  return data
}
export async function GetDynamicTopRecords(slug: string, limit: number): Promise<any> {
  const data = await fetcher(`/top/${slug}/${limit}`)
  return data
}
export async function SearchForRider(term: string): Promise<{ results: Array<RiderSearch> }> {
  const data = await fetcher(`/rider/search/${term}`)
  return data
}
export async function GetTrackNames() {
  const data = await fetcher(`/records/track_names`)
  return data
}
export async function GetTrackRecords(track: string): Promise<Track> {
  const data = await fetcher(`/records/track/${track}`)
  return data
}

// RACES

export async function GetRecentRaces(): Promise<{ races: Array<RecentRace> }> {
  const data = await fetcher("/races")
  return data
}
export async function GetRace(raceId: string): Promise<RaceSession> {
  const data = await fetcher(`/races/${raceId}`)
  return data
}

// RIDER

export async function GetRider(guid: string): Promise<RiderProfile> {
  const data = await fetcher(`/rider/${guid}`)
  return data
}
export async function GetRiderRecords(guid: string): Promise<{ records: any }> {
  const data = await fetcher(`/rider/${guid}/records`)
  return data
}
export async function GetRiderRaces(guid: string): Promise<{ races: any }> {
  const data = await fetcher(`/rider/${guid}/races`)
  return data
}
export async function GetRiderMMRHistory(guid: string): Promise<RiderMMRUpdates> {
  const data = await fetcher(`/rider/${guid}/mmr_history`)
  return data
}
export async function GetRiderLeagues(token: string): Promise<{ leagues: Array<League> }> {
  const data = await fetcher("/my_leagues", token)
  return data
}

// LEAGUES

export async function GetAllLeagues(): Promise<{ leagues: Array<League> }> {
  const data = await fetcher("/leagues")
  return data
}
export async function GetLeague(leagueId: string, token: string): Promise<League> {
  const data = await fetcher(`/league/${leagueId}`, token)
  return data
}
export async function GetLeagueRace(raceId: string, token: string): Promise<LeagueRaceDetails> {
  const data = await fetcher(`/race/${raceId}`, token)
  return data
}
export async function GetLeagueEligibility(
  leagueId: string,
  token: string
): Promise<LeagueEligibility> {
  const data = await fetcher(`/league/${leagueId}/check`, token)
  return data
}
// prettier-ignore
export async function GetLeagueRaceEligibility(raceId: string, token: string): Promise<LeagueRaceEligibility> {
  const data = await fetcher(`/race/${raceId}/check`, token)
  return data
}

// ADMINISTRATION

export async function GetBlackListSR(): Promise<{ riders: Array<BlacklistRider> }> {
  const data = await fetcher("/blacklist.json")
  return data
}
export async function GetBlackListNonSR(): Promise<{ riders: Array<BlacklistRider> }> {
  const data = await fetcher("/blacklist_non_sr.json")
  return data
}
// prettier-ignore
export async function GetAdminRiderReports(
  token: string,
  status?: string
): Promise<{ results: Array<RiderReport> }> {
  const data = await fetcher(`/rider/report/${status}`, token)
  return data
}
// prettier-ignore
export async function GetAdminRiderAppeals(
  token: string,
  status?: string
): Promise<{ results: Array<BanAppeal> }> {
  const data = await fetcher(`/rider/appeal/${status}`, token)
  return data
}

// AUTHENTICATION

export async function Logout(): Promise<{ status: boolean }> {
  return { status: true }
}

// CONSTANTS

export async function GetConstantOEMBikes(token: string): Promise<{ [key: string]: Array<any> }> {
  const data = await fetcher("/constants/oem_bikes", token)
  return data
}
export async function GetConstantServers(token: string): Promise<{ datacenters: any }> {
  const data = await fetcher("/constants/server_locations", token)
  return data
}

interface SteamUser {
  _id?: string
  name?: string
  avatar?: string
  type?: string
  token?: string
  exp?: number
}

const makeUser = (u): User => {
  return {
    token: u?.token ?? "",
    guid: u?._id ?? "",
    name: u?.name ?? "",
    avatar: u?.avatar ?? "",
    isAdmin: u?.type === "admin" ?? false,
  }
}
