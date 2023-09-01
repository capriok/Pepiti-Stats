export const handleReasonRemedy = (reason) => {
  switch (reason?.toLowerCase()) {
    case "sr":
      return "Safety Rating Banned (Temporary)"

    case "global":
      return "Globally Banned (Permanent)"

    case "racism":
      return "Admin Banned (Permanent)"

    case "afk":
    case "rammer":
    case "cutting":
    case "cheating":
    case "riding backwards":
      return "Admin Banned (Appealable)"

    default:
      return "Banned (Appealable)"
  }
}
