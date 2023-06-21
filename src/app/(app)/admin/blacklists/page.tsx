import Link from "next/link"
import { GetBlackListNonSR, GetBlackListSR } from "~/api"
import PageHeader from "~/components/PageHeader"
import Blacklists from "./components/Blacklists"

export const metadata = {
  title: "Pepiti | Admin Manager",
}

export default async function Page() {
  const blacklistSR = await GetBlackListSR()
  const blacklistNonSR = await GetBlackListNonSR()

  return (
    <>
      <PageHeader
        title="Blacklists"
        extra={
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
        }
      />
      <div className="mt-4">
        <Blacklists
          blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === "SR")}
          blacklistNonSR={blacklistNonSR.riders}
        />
      </div>
    </>
  )
}
