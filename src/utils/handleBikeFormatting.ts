export const handleBikeFormatting = (bike: string) => {
  return bike.replace("2023", "").replace("FACTORY_", "Factory ")
}

export const handleCategoryFormatting = (bike: string) => {
  return bike.replace("FACTORY", "Factory")
}
