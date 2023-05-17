'use server'

import { cookies } from 'next/headers'

const ENDPOINT = process.env.NEXT_PUBLIC_PEPITI

export const publicRequest = async (url: string) => {
  const res = await fetch(ENDPOINT + url)
  return res.json()
}

async function privateRequest(url: string) {
  const token = cookies().get('access_token')?.value
  console.log(token)

  const res = await fetch(ENDPOINT + url, {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return res.json()
}

export async function banRider(guid: string, reason: string) {
  const data = await privateRequest(`/rider/${guid}/ban/${reason}`)
  return data
}

export async function unbanRider(guid: string) {
  const data = await privateRequest(`/rider/${guid}/unban`)
  return data
}
