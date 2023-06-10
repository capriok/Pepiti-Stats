export const handleRankColor = (idx: number) => {
  switch (idx) {
    case 1:
      return "dark:bg-yellow-400/80 bg-yellow-400/80"
    case 2:
      return "dark:bg-neutral-300/80 bg-neutral-500/80"
    case 3:
      return "dark:bg-orange-500/80 bg-orange-400/80"

    default:
      return ""
  }
}
