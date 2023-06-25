import { GetBlackListNonSR, GetBlackListSR } from "~/api"
import PageHeader from "~/components/PageHeader"
import PageLayout from "~/components/PageLayout"
import Blacklists from "../admin/blacklists/components/Blacklists"

export const metadata = {
  title: "Pepiti | Blacklists",
  description: "Look up and view riders on the Safety Rating and Global Blacklists",
}

export default async function Page() {
  const blacklistSR = await GetBlackListSR()
  const blacklistNonSR = await GetBlackListNonSR()

  return (
    <PageLayout
      width="app"
      header={{
        title: "Blacklists",
        extra: "Be sure to check the Global and SR Blacklist",
      }}
    >
      <Blacklists
        blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === "SR")}
        blacklistNonSR={blacklistNonSR.riders}
      />
    </PageLayout>
  )
}
