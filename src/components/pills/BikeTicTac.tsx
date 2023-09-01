import { handleBikeFormatting } from "~/utils/handleBikeFormatting"

interface Props {
  bike: string
  showLabel?: boolean
}

export default function BikeTicTac({ bike, showLabel = true }: Props) {
  const bikeColor = handleBikeColor(bike)

  return (
    <div className="flex items-center">
      <div className={`mr-3 h-5 w-2 rounded-md shadow-sm ${bikeColor}`} />
      {(showLabel && handleBikeFormatting(bike)) || ""}
    </div>
  )
}

export const handleBikeColor = (bike: string) => {
  // prettier-ignore
  const brandMap: any = {
    "Honda": "bg-red-700/80 dark:bg-red-700/60",
    "CR500AF": "bg-red-700/80 dark:bg-red-700/60",
    "CRF450R": "bg-red-700/80 dark:bg-red-700/60",
    "CRF250R": "bg-red-700/80 dark:bg-red-700/60",
    "CR250": "bg-red-700/80 dark:bg-red-700/60",
    "CR144": "bg-red-700/80 dark:bg-red-700/60",
    "CR125": "bg-red-700/80 dark:bg-red-700/60",

    "Kawasaki": "bg-green-500/80 dark:bg-green-500/60",
    "KX250": "bg-green-500/80 dark:bg-green-500/60",
    "KX144": "bg-green-500/80 dark:bg-green-500/60",
    "KX125": "bg-green-500/80 dark:bg-green-500/60",

    "Yamaha": "bg-blue-600/80 dark:bg-blue-600/60",
    "YZ250": "bg-blue-600/80 dark:bg-blue-600/60",
    "YZ144": "bg-blue-600/80 dark:bg-blue-600/60",
    "YZ125": "bg-blue-600/80 dark:bg-blue-600/60",

    "KTM": "bg-orange-500/80 dark:bg-orange-500/60",
    "250SX": "bg-orange-500/80 dark:bg-orange-500/60",
    "150SX": "bg-orange-500/80 dark:bg-orange-500/60",
    "125SX": "bg-orange-500/80 dark:bg-orange-500/60",

    "Suzuki": "bg-yellow-300/80 dark:bg-yellow-400/60",
    "RM250": "bg-yellow-300/80 dark:bg-yellow-400/60",
    "RM144": "bg-yellow-300/80 dark:bg-yellow-400/60",
    "RM125": "bg-yellow-300/80 dark:bg-yellow-400/60",
    
    "GASGAS": "bg-red-600/80 dark:bg-red-600/60",

    "Husqvarna": "bg-neutral-500/60 dark:bg-neutral-500/80",

    "Fantic": "bg-neutral-700/80 dark:bg-neutral-700/60",

    "Alta": "bg-neutral-800/80 dark:bg-neutral-800/60",

    "TM": "bg-sky-400/80 dark:bg-sky-400/60",

    "Beta": "bg-red-700/80 dark:bg-red-700/60",

    "": "bg-black/80 dark:bg-black/60",
  }

  const brands = Object.keys(brandMap)
  const brand = brands.find((brand) => bike.includes(brand))

  return brandMap[brand || ""] + " text-center"
}
