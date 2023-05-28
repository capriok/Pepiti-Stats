import { InfoIcon } from "lucide-react"

export default function BannedBanner({ banned, reason }) {
  const tipText = `- "Global" ban means you are on the global blacklist. No help for you.\n
  - "SR" Banned means your safety rating is under 950. Race in a banned/no-contact server to build your SR back up.\n
  - Custom message ban means you should go to the MB Bikes discord and find the #ban-appeal channel under Pepiti-Stats.`

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
