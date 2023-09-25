export const handleBikeFormatting = (bike: string) => {
  return bike
    .replace("FACTORY_", "Factory ")
    .replace("E10_", "E10 ")
    .replace("2023", "")
    .replace("2024", "")
}

export const handleCategoryFormatting = (bike: string) => {
  return bike.replace("FACTORY", "Factory")
}
