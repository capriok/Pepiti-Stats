import { GetBlackListNonSR, GetBlackListSR } from "~/api"
import AdminBlacklistsPage from "./AdminBlacklistsPage"

export const metadata = {
  title: "Pepiti | Admin Manager",
}

export default async function Page() {
  const blacklistSR = await GetBlackListSR()
  const blacklistNonSR = await GetBlackListNonSR()

  return (
    <AdminBlacklistsPage
      blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === "SR")}
      blacklistNonSR={blacklistNonSR.riders}
    />
  )
}
