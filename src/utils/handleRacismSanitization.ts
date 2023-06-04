export const handleRacismSanitization = (name: string): string =>
  name.replace(/NIGGER|Nigger|Nigg|nigger|nigg/, "******")
