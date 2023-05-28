export const handleRankColor = (idx: number) => {
  switch (idx) {
    case 1:
      return "bg-yellow-400"
    case 2:
      return "bg-neutral-300"
    case 3:
      return "bg-orange-900"

    default:
      return ""
  }
}
