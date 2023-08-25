const sessionsMap = {
  PRACTICE: "Practice",
  PREQUALIFY: "Pre-Qualify",
  QUALIFYPRACTICE: "Qualify Practice",
  QUALIFY: "Qualify",
  WARMUP: "Warmup",
  RACE1: "Race",
  RACE2: "Race",
  "": "Unknown",
}

export const handleSessionEnum = (session: string) => {
  return sessionsMap[session]
}
