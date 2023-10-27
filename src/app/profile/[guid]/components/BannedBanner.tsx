"use client"

import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Hammer } from "lucide-react"
import { handleReasonRemedy } from "~/utils/handleReasonRemedy"

export default function BannedBanner({ banned, reason: reasonRaw }) {
  const reason = reasonRaw?.toLowerCase()
  const isSrBan = reason === "sr"

  return (
    banned && (
      <Alert className={`mb-8 ${isSrBan ? "border-warning" : "border-error"}`}>
        <Hammer size={20} />
        <AlertTitle className="text-md mb-4">{handleReasonRemedy(reason)}.</AlertTitle>
        <AlertDescription className="mb-4">
          <div className="flex gap-2">
            <div>Reason:</div>
            <div className="uppercase">{reason}</div>
          </div>
        </AlertDescription>
        <AlertDescription>
          {
            reason.includes("global")
            ? <section>
              <div className="mb-1">You are banned Globally, this means you did something to be banned by an MXB Discord admin for the foreseeable future.</div>
              <div className="mb-1">You may try to appeal in the MXB Discord through the official ban-appeal channel, good luck.</div>
            </section>
            : reason.includes("sr")
            ? <div className="mb-1">You are temporarily blacklisted for Low SR, this means your safety rating is under 950. You can gain 2 SR per lap in the Low-SR No-Contact server to raise SR above 950 to be automatically unbanned.</div>
            : <section>
              {
                reason.includes("backwards")
                ? <div className="mb-1">You are banned for Riding backwards.</div>
                : reason.includes("rammer")
                ? <div className="mb-1">You are banned for Ramming.</div>
                : reason.includes("cutting")
                ? <div className="mb-1">You are banned for Cutting.</div>
                : reason.includes("cheating")
                ? <div className="mb-1">You are banned for Cheating.</div>
                : <div className="mb-1">A Custom ban reason means you were banned by an admin for a specific reason.</div>
              }
              <div className="mb-1">You may submit a ban appeal by clicking the button below and pleading your case in the Pepiti-ban-appeal channel.</div>
            </section>
          }
          <br />
          <div className="mb-4 underline">
            {isSrBan ? (
              <Link href="/servers">
                <div className="flex gap-2">
                  Join the Low SR Server
                  <Hammer size={18} />
                </div>
              </Link>
            ) : (
              <Link href="https://discord.com/invite/mx-bikes"
                target="_blank"
                rel="noopener noreferrer"
              >Submit Appeal</Link>
            )}
          </div>
        </AlertDescription>
      </Alert>
    )
  )
}
