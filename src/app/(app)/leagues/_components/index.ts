export const checkRequirements = (eligibility) => {
  if (eligibility.MMR == false) return false
  if (eligibility.SR == false) return false
  if (eligibility.laps == false) return false
  if (eligibility.races == false) return false
  if (eligibility.records == false) return false

  return true
}

export const leagueStatusMap = {
  0: { text: "Registration Open", color: "bg-secondary" },
  1: { text: "League in Progress", color: "bg-orange-500" },
  2: { text: "League Finished", color: "bg-red-500" },
}

export const leagueRaceStatusMap = {
  0: { text: "Registration Open", color: "bg-secondary" },
  1: { text: "Race in Progress", color: "bg-orange-500" },
  2: { text: "Race Finished", color: "bg-red-500" },
}
