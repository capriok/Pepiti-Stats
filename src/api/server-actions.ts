'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

const ENDPOINT = process.env.NEXT_PUBLIC_PEPITI

async function privateRequest(url: string) {
  const token = cookies().get('access_token')?.value

  await fetch(ENDPOINT + url, {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
}

export async function banRider(data: FormData) {
  const guid = data.get('guid')
  const reason = data.get('reason')

  await privateRequest(`/rider/${guid}/ban/${reason}`)
  revalidatePath('/')
}

export async function unbanRider(data: FormData) {
  const guid = data.get('guid')

  await privateRequest(`/rider/${guid}/unban`)
  revalidatePath('/')
}
