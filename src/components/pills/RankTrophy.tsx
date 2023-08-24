import { Trophy } from "lucide-react"

interface Props {
  rank: number
  [key: string]: any
}

export default function RankTrophy(props: Props) {
  return (
    <Trophy size={props.size || 15} className={`mr-4 shadow-sm ${handleTrophyColor(props.rank)}`} />
  )
}

export const handleTrophyColor = (idx: number) => {
  switch (idx) {
    case 1:
      return "text-yellow-500/80 dark:text-yellow-400/80"
    case 2:
      return "text-neutral-500/80 dark:text-neutral-300/80"
    case 3:
      return "text-orange-600/80 dark:text-orange-400/80"

    default:
      return "text-transparent"
  }
}
