"use server"

import { cookies } from "next/headers"
import jwt_decode from "jwt-decode"
import { fetcher } from "./fetcher"

async function getAuthUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("access_token")?.value

  try {
    const decode: any = jwt_decode(token!) ?? {}
    const user = await fetcher(`/rider/${decode._id}`)
    
    if (decode._id !== user._id) return makeUser({})

    return makeUser({ ...user, token: token })
  } catch (error) {
    const nullUser = makeUser({})

    return nullUser
  }
}

export default getAuthUser

const makeUser = (u): User => {
  return {
    token: u?.token ?? "",
    guid: u?._id ?? "",
    name: u?.name ?? "",
    avatar: u?.avatar ?? "",
    isAdmin: u?.type === "admin" ?? false,
  }
}
