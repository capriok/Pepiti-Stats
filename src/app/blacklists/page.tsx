import { GetBlackListNonSR, GetBlackListSR } from "~/api"
import BlacklistsPage from ".//BlacklistsPage"

export const metadata = {
  title: "Pepiti | Blacklists",
  description: "Look up and view riders on the Safety Rating and Global Blacklists",
}

export default async function Page() {
  const blacklistSR = await GetBlackListSR()
  const blacklistNonSR = await GetBlackListNonSR()

  return (
    <BlacklistsPage
      blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === "SR")}
      blacklistNonSR={blacklistNonSR.riders}
    />
  )
}
