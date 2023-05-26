'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const ENDPOINT = process.env.NEXT_PUBLIC_API

async function fetcher(url: string) {
  const token = cookies().get('access_token')?.value

  return await fetch(ENDPOINT + url, {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
}

async function poster(url: string, body = {}) {
  const token = cookies().get('access_token')?.value

  return await fetch(ENDPOINT + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  })
}

// RIDER BANS

export async function banRider(data: FormData) {
  const guid = data.get('guid')
  const reason = data.get('reason')

  await fetcher(`/rider/${guid}/ban/${reason}`)
  revalidatePath('/')
}

export async function unbanRider(data: FormData) {
  const guid = data.get('guid')

  await fetcher(`/rider/${guid}/unban`)
  revalidatePath('/')
}

// LEAGUES

export async function joinLeague(data: FormData) {
  const leagueId = data.get('leagueId')

  const body = {
    guid: data.get('guid'),
    name: data.get('riderName'),
    team: data.get('teamName'),
    race_number: data.get('raceNumber'),
    bike_preference: data.get('bikePreference'),
    // server_preference: data.get('serverPreference'),
  }

  await poster(`/league/${leagueId}/join`, body)

  revalidatePath('/')
}
export async function leaveLeague(data: FormData) {
  const leagueId = data.get('leagueId')

  await poster(`/league/${leagueId}/leave`)
  revalidatePath('/')
}
export async function joinLeagueRace(data: FormData) {
  const raceId = data.get('raceId')

  await poster(`/race/${raceId}/join`)
  revalidatePath('/')
}
export async function leaveLeagueRace(data: FormData) {
  const raceId = data.get('raceId')

  await poster(`/race/${raceId}/leave`)
  revalidatePath('/')
}
