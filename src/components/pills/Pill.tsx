interface PillProps {
  text: any
  color?: string
}

export default function Pill({ text, color = "neutral" }: PillProps) {
  const colorMap = {
    neutral: {
      bg: "bg-accent/60 dark:bg-accent/40",
      text: "text-neutral-100 dark:text-neutral-200",
    },
    secondary: {
      bg: "bg-secondary/80 dark:bg-secondary/40",
      text: "text-green-100 dark:text-green-200",
    },
    info: {
      bg: "bg-info/80 dark:bg-info/40",
      text: "text-neutral-100 dark:text-info-200",
    },
    red: {
      bg: "bg-red-500/80 dark:bg-red-500/40",
      text: "text-neutral-100 dark:text-red-200",
    },
    orange: {
      bg: "bg-orange-500/80 dark:bg-orange-500/40",
      text: "text-neutral-100 dark:text-orange-200",
    },
  }

  return (
    <div
      className={`pill ${colorMap[color].bg} ${colorMap[color].text} w-fit rounded-[10px] px-2 py-1 text-center font-semibold`}
    >
      <div className="m-0 p-0 px-1 text-sm">{text}</div>
    </div>
  )
}
