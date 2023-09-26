export const handleBikeFormatting = (bike: string) => {
  return bike.replace(/FACTORY_|OEM|199[0-9]|20[0-9]\d/g, (match) => {
    if (match === "FACTORY_") return "E10 "
    return ""
  })
}

export const handleCategoryFormatting = (bike: string) => {
  return bike.replace(/FACTORY/g, "E10 ")
}
