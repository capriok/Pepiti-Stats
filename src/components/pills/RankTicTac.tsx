import { handleRankColor } from "~/utils/handleRankColor"

interface Props {
  rank: number
}

export default function RankTicTac({ rank }: Props) {
  return <div className={`mr-4 h-5 w-2 rounded-sm shadow-sm ${handleRankColor(rank)}`} />
}
