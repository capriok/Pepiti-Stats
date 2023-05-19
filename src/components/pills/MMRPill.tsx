export default function MMRPill({ mmr }: { mmr: number }) {
  const prefixedMMR = mmr > 0 ? '+' + mmr : mmr
  const position = mmr > 0 ? 'positive' : mmr === 0 ? 'even' : 'negative'

  const colorMap = {
    negative: {
      bg: 'bg-red-500/30',
      text: 'text-red-200',
    },
    even: {
      bg: 'bg-orange-500/30',
      text: 'text-orange-200',
    },
    positive: {
      bg: 'bg-secondary/30',
      text: 'text-green-200',
    },
  }

  return (
    <div
      className={`pill ${colorMap[position].bg} ${colorMap[position].text} w-fit rounded-[10px] px-2 py-1 text-center font-semibold`}>
      <p className="m-0 text-sm">{prefixedMMR}</p>
    </div>
  )
}
