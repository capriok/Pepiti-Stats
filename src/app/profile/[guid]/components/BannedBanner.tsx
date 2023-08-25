"use client"

import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Hammer } from "lucide-react"

export default function BannedBanner({ banned, reason }) {
  const reasonMap = {
    sr: "Safety Rating Banned (Temporary)",
    global: "Globally Banned (Permanent)",
  }
  const isSrBan = reason?.toLowerCase() === "sr"

  return (
    banned && (
      <Alert className="mb-8 border-error">
        <Hammer size={20} />
        <AlertTitle className="text-md mb-4">
          {reasonMap[reason?.toLowerCase()] ?? "Banned"}.
        </AlertTitle>
        <AlertDescription className="mb-4">
          <div className="flex gap-2">
            <div>Reason:</div>
            <div className="uppercase">{reason}</div>
          </div>
        </AlertDescription>
        <AlertDescription>
          <div className="mb-1">
            &quot;SR&quot; ban means your safety rating is under 950. You can gain 2 SR per lap in
            the Low-SR No-Contact server to raise SR above 950 to be automatically unbanned.
          </div>
          <div className="mb-1">
            &quot;Global&quot; ban means you did something to be banned from online racing for the
            foreseeable future.
          </div>
          <div className="mb-1">
            Custom message ban means you were banned by an admin for a specific reason, submit a ban
            appeal.
          </div>
          <br />
          <div className="mb-4 underline">
            {isSrBan ? (
              <Link href="/servers?id=93">
                <div className="flex gap-2">
                  Join the Low SR Server
                  <Hammer size={18} />
                </div>
              </Link>
            ) : (
              <Link href="/blacklists">Submit Appeal</Link>
            )}
          </div>
        </AlertDescription>
      </Alert>
    )
  )
}
