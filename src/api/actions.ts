"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const ENDPOINT = process.env.NEXT_PUBLIC_API
const nextConfig = { next: { revalidate: 30 } }
const token = cookies().get("access_token")?.value

async function fetcher(url: string) {
  console.log("Fetcher", { url, token })

  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  })
  const status = res.status
  console.log("%cFetcher", "color: steelblue", { status })

  try {
    const data = await res.json()
    if (status !== 200) throw new Error(data.message)

    return data
  } catch (error) {
    throw new Error("An unknown error occurred")
  }
}

async function poster(url: string, options: { method: string; body?: any }) {
  const opts = {
    method: options.method ?? "POST",
    body: JSON.stringify(options.body),
  }

  console.log("Poster", { url, token, opts })

  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    ...opts,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
  })
  const status = res.status
  console.log("%cPoster", "color: steelblue", { status })

  try {
    const data = await res.json()
    if (status !== 200) throw new Error(data.message)

    return data
  } catch (error) {
    throw new Error("An unknown error occurred")
  }
}

export async function deleteCookie() {
  cookies().set({
    name: "access_token",
    value: "",
    expires: new Date("1970-01-01"),
    path: "/",
  })
}

// --
// ? BAN APPEAL

export async function postBanAppeal(formData: FormData) {
  const body = {
    by: formData.get("userGuid"),
    appeal: formData.get("appeal"),
  }

  console.log("Action: postBanAppeal", body)

  // ! Unsupported (Future feature)
  return await new Promise((res, rej) => rej(new Error("Not Supported")))
  // return await poster(`/appeal`, { method: "POST", body }).then(() => revalidatePath("/"))
}

// --
// ? ADMIN APPEALS

export async function dismissBanAppeal(formData: FormData) {
  const appealId = formData.get("appealId")

  console.log("Action: dismissAppeal", { appealId })

  // ! Unsupported (Future feature)
  return await new Promise((res, rej) => rej(new Error("Not Supported")))
  // return await poster(`/appeal/${appealId}`, { method: "DELETE" }).then(() => revalidatePath("/"))
}

// --
// ? RIDER REPORT

export async function postRiderReport(formData: FormData) {
  const proofs: any = []
  for (let i = 1; i < 4; i++) {
    const proof = formData.get(`proof${i}`)
    console.log(proof)

    if (proof) proofs.push(proof)
  }
  const body = {
    by: formData.get("userGuid"),
    race_id: formData.get("eventId"),
    guid: formData.get("riderGuid"),
    reason: formData.get("reason"),
    proofs: proofs,
  }

  console.log("Action: postRiderReport", body)

  return await poster(`/rider/report`, { method: "POST", body }).then(() => revalidatePath("/"))
}

// --
// ? ADMIN REPORTS

export async function dismissRiderReport(formData: FormData) {
  const reportId = formData.get("reportId")

  console.log("Action: dismissReport", { reportId })

  return await poster(`/rider/report/${reportId}`, { method: "DELETE" }).then(() =>
    revalidatePath("/")
  )
}
export async function dismissAbuseRiderReport(formData: FormData) {
  const reportId = formData.get("reportId")
  const userId = formData.get("userId")

  console.log("Action: dismissAbuseRiderReport", { reportId })

  // ! Unsupported (Future feature)
  return await new Promise((res, rej) => rej(new Error("Not Supported")))
  // return await poster(`/rider/report/${reportId}${userId}`, { method: "DELETE" }).then(() => revalidatePath("/"))
}

// --
// ? RIDER BANS

export async function banRider(formData: FormData) {
  const guid = formData.get("guid")
  const reason = formData.get("reason")

  console.log("Action: banRider", { guid, reason })

  return await fetcher(`/rider/${guid}/ban/${reason}`).then(() => revalidatePath("/"))
}

export async function unbanRider(formData: FormData) {
  const guid = formData.get("guid")

  console.log("Action: unbanRider", { guid })

  return await fetcher(`/rider/${guid}/unban`).then(() => revalidatePath("/"))
}

// --
// ? LEAGUES

export async function joinLeague(formData: FormData) {
  const leagueId = formData.get("leagueId")

  const body = {
    guid: formData.get("guid"),
    name: formData.get("riderName"),
    team: formData.get("teamName"),
    race_number: parseInt(formData.get("raceNumber")!.toString()),
    bike_id: formData.get("bikePreference"),
    server_preference: formData.get("serverPreference"),
  }

  console.log("Action: joinLeague", { leagueId, body })

  return await poster(`/league/${leagueId}/join`, { method: "POST", body }).then(() =>
    revalidatePath("/")
  )
}

export async function leaveLeague(formData: FormData) {
  const leagueId = formData.get("leagueId")

  console.log("Action: leaveLeague", { leagueId })

  return await poster(`/league/${leagueId}/leave`, { method: "DELETE" }).then(() =>
    revalidatePath("/")
  )
}

export async function joinLeagueRace(formData: FormData) {
  const raceId = formData.get("raceId")

  console.log("Action: joinLeagueRace", { raceId })

  return await poster(`/race/${raceId}/join`, { method: "POST" }).then(() => revalidatePath("/"))
}

export async function leaveLeagueRace(formData: FormData) {
  const raceId = formData.get("raceId")

  console.log("Action: leaveLeagueRace", { raceId })

  return await poster(`/race/${raceId}/leave`, { method: "DELETE" }).then(() => revalidatePath("/"))
}
