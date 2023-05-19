import { InfoIcon } from 'lucide-react'

export default function BannedBanner({ banned, reason }) {
  const tipText =
    '- SR Banned means your safety rating is under 900. Race in a banned/no-contact server to build your SR back up.\n\n- Global ban means you are on the global blacklist. No help for you.\n\nCustom message ban means you should go to the #ban-appeal discord channel under Pepiti-Stats.'
  return (
    banned && (
      <div className="alert alert-error flex w-fit justify-end gap-2 py-2">
        <div
          className="tooltip tooltip-bottom whitespace-pre-line text-left md:tooltip-bottom"
          data-tip={tipText}>
          <InfoIcon />
        </div>
        <h1>{reason + ' Ban'}</h1>
      </div>
    )
  )
}
