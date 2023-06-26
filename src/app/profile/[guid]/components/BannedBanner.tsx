"use client"

import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Hammer } from "lucide-react"

export default function BannedBanner({ banned, reason }) {
  return (
    banned && (
      <Alert className="mb-8 border-error">
        <Hammer size={20} />
        <AlertTitle>Rider Banned.</AlertTitle>
        <AlertDescription className="mb-4">
          <div className="flex">Reason: {`${reason}`}</div>
        </AlertDescription>
        <AlertDescription>
          <div>
            &quot;SR&quot; ban means your safety rating is under 950. Race in a banned/no-contact
            server to raise SR above 950 to be automatically unbanned.
          </div>
          <div>
            &quot;Global&quot; ban means you did something to be banned from online racing for the
            foreseeable future, submit a ban appeal.
          </div>
          <div>
            Custom message ban means you were banned by an admin for a specific reason, submit a ban
            appeal.
          </div>
          <br />
          <Link href="/blacklists" className="underline">
            Submit Appeal
          </Link>
        </AlertDescription>
      </Alert>
    )
  )
}
