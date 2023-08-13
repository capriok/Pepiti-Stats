import Link from "next/link"
import { GetAllPepitiServers } from "~/api"
import PageLayout from "~/components/PageLayout"
import MXBServers from "./components/MXBServers"

export const metadata = {
  title: "Pepiti | Leagues",
  description: "Compete in race leagues for real prizes and profile accolades",
}

export default async function Page() {
  const serverList = await GetAllPepitiServers()

  return (
    <PageLayout
      width="app"
      header={{
        title: "MXB Servers",
        extra: <Link href="/dashboard">Go back</Link>,
      }}
    >
      <MXBServers servers={Object.keys(serverList.servers).map((s) => serverList.servers[s])} />
    </PageLayout>
  )
}
