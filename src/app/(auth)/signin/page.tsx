import Link from "next/link"
import React from "react"
import Result from "~/components/Result"
import { Button } from "~/ui/Button"

export default function Page() {
  return (
    <Result
      title="Access Denied."
      description="Sign in with Steam to view this page."
      extra={
        <Link
          target="_blank"
          referrerPolicy="origin"
          href="https://pepiti.com/stats/api/v0/steam_login"
        >
          <Button variant="outline">Login with Steam</Button>
        </Link>
      }
    />
  )
}
