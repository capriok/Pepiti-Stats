import { handleBikeColor } from "~/utils/handleBikeColor"

interface Props {
  bike: string
  showLabel?: boolean
}

export default function BikeTicTac({ bike, showLabel = true }: Props) {
  const bikeColor = handleBikeColor(bike)

  return (
    <div className="flex items-center">
      <div className={`mr-3 h-5 w-2 rounded-sm shadow-sm ${bikeColor}`} />
      {(showLabel && bike) || ""}
    </div>
  )
}
