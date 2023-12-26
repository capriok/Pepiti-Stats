export const handleRacismSanitization = (name: string): string => {
  if (!name) return name
  return name.replace(/N[1Ii][6Gg]{2}[3Ee][4Rr]/g, "******")
}
