"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const ENDPOINT = process.env.NEXT_PUBLIC_API
const token = cookies().get("access_token")?.value
const errorMessage = (res) => `Status ${res.status}: ${res.statusText}`

// HELPERS

async function fetcher(url: string) {
  console.log("Fetcher", { url, token })

  return await fetch(ENDPOINT + url, {
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  }).then((res) => {
    if (!res.ok) throw new Error(errorMessage(res))
  })
}

async function poster(url: string, options: { method: string; body?: any }) {
  const opts = {
    method: options.method ?? "POST",
    body: JSON.stringify(options.body),
  }

  console.log("Poster", { url, token, opts })

  return await fetch(ENDPOINT + url, {
    ...opts,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  }).then((res) => {
    if (!res.ok) throw new Error(errorMessage(res))
  })
}

// RIDER REPORT

export async function postRiderReport(data: FormData) {
  const proofs: any = []
  for (let i = 1; i < 4; i++) {
    const proof = data.get(`proof${i}`)
    console.log(proof)

    if (proof) proofs.push(proof)
  }
  const body = {
    by: data.get("userGuid"),
    race_id: data.get("eventId"),
    guid: data.get("riderGuid"),
    reason: data.get("reason"),
    proofs: proofs,
  }

  console.log("Action: postRiderReport", body)

  return await poster(`/rider/report`, { method: "POST", body }).then(() => revalidatePath("/"))
}

// ADMIN REPORTS

export async function reopenRiderReport(data: FormData) {
  const reportId = data.get("reportId")

  console.log("Action: reopenReport", { reportId })

  return await new Promise((res, rej) => rej(new Error("Not Supported")))
  // return await poster(`/rider/report/${reportId}`, { method: "PUT" }).then(() =>
  //   revalidatePath("/")
  // )
}
export async function dismissRiderReport(data: FormData) {
  const reportId = data.get("reportId")

  console.log("Action: dismissReport", { reportId })

  return await poster(`/rider/report/${reportId}`, { method: "DELETE" }).then(() =>
    revalidatePath("/")
  )
}
export async function dismissAbuseRiderReport(data: FormData) {
  const reportId = data.get("reportId")
  const userId = data.get("userId")

  console.log("Action: dismissAbuseRiderReport", { reportId })

  return await poster(`/rider/report/${reportId}`, { method: "DELETE" }).then(() =>
    revalidatePath("/")
  )
}

// RIDER BANS

export async function banRider(data: FormData) {
  const guid = data.get("guid")
  const reason = data.get("reason")

  console.log("Action: banRider", { guid, reason })

  return await fetcher(`/rider/${guid}/ban/${reason}`).then(() => revalidatePath("/"))
}

export async function unbanRider(data: FormData) {
  const guid = data.get("guid")

  console.log("Action: unbanRider", { guid })

  return await fetcher(`/rider/${guid}/unban`).then(() => revalidatePath("/"))
}

// LEAGUES

export async function joinLeague(data: FormData) {
  const leagueId = data.get("leagueId")

  const body = {
    guid: data.get("guid"),
    name: data.get("riderName"),
    team: data.get("teamName"),
    race_number: parseInt(data.get("raceNumber")!.toString()),
    bike_id: data.get("bikePreference"),
    server_preference: data.get("serverPreference"),
  }

  console.log("Action: joinLeague", { leagueId, body })

  await poster(`/league/${leagueId}/join`, { method: "POST", body }).then(() => revalidatePath("/"))
}

export async function leaveLeague(data: FormData) {
  const leagueId = data.get("leagueId")

  console.log("Action: leaveLeague", { leagueId })

  return await poster(`/league/${leagueId}/leave`, { method: "DELETE" }).then(() =>
    revalidatePath("/")
  )
}

export async function joinLeagueRace(data: FormData) {
  const raceId = data.get("raceId")

  console.log("Action: joinLeagueRace", { raceId })

  return await poster(`/race/${raceId}/join`, { method: "POST" }).then(() => revalidatePath("/"))
}

export async function leaveLeagueRace(data: FormData) {
  const raceId = data.get("raceId")

  console.log("Action: leaveLeagueRace", { raceId })

  return await poster(`/race/${raceId}/leave`, { method: "DELETE" }).then(() => revalidatePath("/"))
}
