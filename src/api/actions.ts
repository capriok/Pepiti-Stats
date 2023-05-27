'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const ENDPOINT = process.env.NEXT_PUBLIC_API
const token = cookies().get('access_token')?.value

// HELPERS

async function fetcher(url: string) {
  console.log('Fetcher', { url, token })

  return await fetch(ENDPOINT + url, {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }).then(response => {
    if (!response.ok) throw new Error("Request failed.")
  })
}

async function poster(url: string, options: { method: string; body?: any }) {
  console.log('Poster', { token })

  const opts = {
    method: options.method ?? 'POST',
    body: JSON.stringify(options.body),
  }

  console.log('Poster', { url, token, opts })

  return await fetch(ENDPOINT + url, {
    ...opts,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  }).then(response => {
    if (!response.ok) throw new Error("Request failed.")
  })
}

// RIDER REPORT

export async function postRiderReport(data: FormData) {
  const body = {
    by: data.get('userGuid'),
    race_id: data.get('eventId'),
    guid: data.get('riderGuid'),
    reason: data.get('reason'),
    proofs: data.get('proof1'),
    // ? we should make this a list of proofs, need api support
    // proofs: [data.get('proof1'), data.get('proof2'), data.get('proof3')],
  }

  console.log('Action: postRiderReport', body)

  await poster(`/rider/report`, { method: 'POST', body })
  revalidatePath('/')
}

// ADMIN REPORTS

// ? need api support for admins to be able to dismiss reports
// ? should also get dismissReportWithAbuse to track abusers and ban automatically after x dismissed reports
export async function dismissReport(data: FormData) {
  const reportId = data.get('reportId')

  console.log('Action: dismissReport', { reportId })

  await poster(`/rider/report/${reportId}`, { method: 'DELETE' })
  revalidatePath('/')
}

// RIDER BANS

export async function banRider(data: FormData) {
  const guid = data.get('guid')
  const reason = data.get('reason')

  console.log('Action: banRider', { guid, reason })

  await fetcher(`/rider/${guid}/ban/${reason}`)
  revalidatePath('/')
}

export async function unbanRider(data: FormData) {
  const guid = data.get('guid')

  console.log('Action: unbanRider', { guid })

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
    server_preference: data.get('serverPreference'),
  }

  console.log('Action: joinLeague', { leagueId, body })

  await poster(`/league/${leagueId}/join`, { method: 'POST', body }).catch((err) =>
    console.log(err)
  )
  revalidatePath('/')
}
export async function leaveLeague(data: FormData) {
  const leagueId = data.get('leagueId')

  console.log('Action: leaveLeague', { leagueId })

  await poster(`/league/${leagueId}/leave`, { method: 'DELETE' })
  revalidatePath('/')
}
export async function joinLeagueRace(data: FormData) {
  const raceId = data.get('raceId')

  console.log('Action: joinLeagueRace', { raceId })

  await poster(`/race/${raceId}/join`, { method: 'POST' })
  revalidatePath('/')
}
export async function leaveLeagueRace(data: FormData) {
  const raceId = data.get('raceId')

  console.log('Action: leaveLeagueRace', { raceId })

  await poster(`/race/${raceId}/leave`, { method: 'DELETE' })
  revalidatePath('/')
}
