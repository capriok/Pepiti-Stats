import cn from "~/utils/cn"

interface PillProps {
  text: any
  color?: string
  [key: string]: any
}

export default function Pill({ text, color = "neutral", ...rest }: PillProps) {
  const colorMap = {
    base: {
      bg: "bg-base-200 dark:bg-base-200",
      text: "text-base-200 dark:text-base-content",
    },
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
      title={rest.title ?? text}
      className={cn(
        "pill w-fit whitespace-nowrap rounded-[10px] px-2 py-1 text-center font-semibold",
        colorMap[color].bg,
        colorMap[color].text,
        rest.className
      )}
      onClick={rest.onClick}
    >
      <div className="m-0 p-0 px-1 text-sm">{text}</div>
    </div>
  )
}
