export default function SRPill({ sr }: { sr: number }) {
  const position = sr <= 900 ? "negative" : sr > 900 && sr <= 950 ? "warning" : "positive"

  const colorMap = {
    negative: {
      bg: "bg-red-500/80 dark:bg-red-500/40",
      text: "text-red-100 dark:text-red-200",
    },
    warning: {
      bg: "bg-orange-500/80 dark:bg-orange-500/40",
      text: "text-orange-100 dark:text-orange-200",
    },
    positive: {
      bg: "bg-primary/80 dark:bg-primary/40",
      text: "text-green-100 dark:text-green-200",
    },
  }

  return (
    <div
      className={`pill ${colorMap[position].bg} ${colorMap[position].text} w-fit rounded-[10px] px-2 py-1 text-center font-semibold`}
    >
      <p className="m-0 text-sm">{sr}</p>
    </div>
  )
}
