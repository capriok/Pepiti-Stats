interface PillProps {
  text: any
  color?: string
}

export default function Pill({ text, color = "neutral" }: PillProps) {
  const colorMap = {
    neutral: {
      bg: "bg-accent/60 dark:bg-accent/40",
      text: "text-neutral-100 dark:text-accent-content",
    },
    primary: {
      bg: "bg-primary/80 dark:bg-primary/40",
      text: "text-neutral-100 dark:text-primary-content",
    },
    info: {
      bg: "bg-info/80 dark:bg-info/40",
      text: "text-neutral-100 dark:text-info-content",
    },
    red: {
      bg: "bg-red-500/80 dark:bg-red-500/40",
      text: "text-neutral-100 dark:text-red-content",
    },
    orange: {
      bg: "bg-orange-500/80 dark:bg-orange-500/40",
      text: "text-neutral-100 dark:text-orange-content",
    },
    yellow: {
      bg: "bg-yellow-500/80 dark:bg-yellow-500/40",
      text: "text-neutral-100 dark:text-yellow-content",
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
