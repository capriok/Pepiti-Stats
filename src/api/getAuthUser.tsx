'use server'

import { cookies } from 'next/headers'
import jwt_decode from 'jwt-decode'

async function getAuthUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('access_token')?.value

  try {
    const decode = jwt_decode(token!) ?? {}
    return makeUser({ ...decode, token: token })
  } catch (error) {
    const nullUser = makeUser({})
    return nullUser
  }
}

export default getAuthUser

const makeUser = (u): User => {
  return {
    guid: u?._id ?? '',
    name: u?.name ?? '',
    avatar: u?.avatar ?? '',
    isAdmin: u?.type === 'admin' ?? false,
    token: u?.token ?? '',
  }
}
