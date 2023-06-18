"use client"

import React, { useEffect } from "react"
import Result from "~/components/Result"
import { deleteCookie } from "~/api/actions"
import { useToast, actions } from "~/components/toast"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const { pushToast } = useToast()

  useEffect(() => {
    deleteCookie()
      .then(() => pushToast(actions.signedOut))
      .then(() => router.push("/"))
  }, [])

  return <Result title="Signing out." description="You will be redirected." />
}
