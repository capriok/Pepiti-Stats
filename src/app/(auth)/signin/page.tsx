import Link from "next/link"
import React from "react"
import Result from "~/components/Result"
import { Button } from "~/ui/Button"

function Login(): string {
  const steam_login = "https://api.pepiti.com/v1/steam_login"
  return steam_login
}

export default function Page() {
  return (
    <Result
      title="Access Denied."
      description="Sign in with Steam to view this page."
      extra={
        <Link target="_blank" referrerPolicy="origin" href={Login()}>
          <Button variant="outline">Login with Steam</Button>
        </Link>
      }
    />
  )
}
