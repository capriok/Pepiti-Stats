const sessionsMap = {
  PRACTICE: "Practice",
  PRE_QUALIFY: "Pre-Qualify",
  QUALIFY_PRACTICE: "Qualify Practice",
  QUALIFY: "Qualify",
  WARMUP: "Warmup",
  RACE1: "Race",
  RACE2: "Race",
  "": "Unknown",
}

export const handleSessionEnum = (session: string) => {
  return sessionsMap[session]
}
