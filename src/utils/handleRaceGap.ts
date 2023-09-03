export const handleRaceGap = (gap: any): string => {
  if (gap === 0) {
    return "DNF"
  }

  if (typeof gap === "number") {
    const date = new Date(0)
    date.setMilliseconds(gap)
    return date.toISOString().substring(14, 23)
  }

  if (gap === "--") {
    return ""
  }

  return gap.replace("L ", "- ") + "L"
}
