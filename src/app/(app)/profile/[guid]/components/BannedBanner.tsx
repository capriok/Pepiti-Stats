import { InfoIcon } from "lucide-react"

export default function BannedBanner({ banned, reason }) {
  const tipText = `- "Global" ban means you did something to be banned from online racing for the foreseeable future, submit a ban appeal.\n
  - "SR" ban means your safety rating is under 950. Race in a banned/no-contact server to raise SR above 950 to be automatically unbanned.\n
  - Custom message ban means you were banned by an admin for a specific reason, submit a ban appeal.`

  return (
    banned && (
      <div className="alert alert-error flex w-fit justify-end gap-2 py-2">
        <div
          className="tooltip tooltip-bottom tooltip-accent whitespace-pre-line text-left md:tooltip-bottom"
          data-tip={tipText}
        >
          <InfoIcon />
        </div>
        <div>Banned - {`"${reason}"`}</div>
      </div>
    )
  )
}
