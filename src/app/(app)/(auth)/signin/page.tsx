import Link from "next/link"
import React from "react"
import Result from "~/components/Result"

export default function Page() {
  return (
    <Result
      title="Access Denied."
      description="Sign in with Steam to view this page."
      extra={
        <Link
          href="https://pepiti.com/stats/api/v0/steam_login"
          target="_blank"
          referrerPolicy="origin"
          className="btn-outline btn-secondary btn-sm btn "
        >
          <div className="font-normal">Login with Steam</div>
        </Link>
      }
    />
  )
}
