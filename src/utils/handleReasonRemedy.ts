export const handleReasonRemedy = (reason) => {
  switch (reason.toLowerCase()) {
    case "global":
      return "Globally Banned (Permanent)"
    case "sr":
      return "Safety Rating Banned (Temporary)"
    default:
      return "Banned (Appealable)"
  }
}
