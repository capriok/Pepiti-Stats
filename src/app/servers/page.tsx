import Link from "next/link"
import { GetAllPepitiServers } from "~/api"
import PageLayout from "~/components/PageLayout"
import MXBServers from "./components/MXBServers"
import { processMXBServers } from "./components"

export const metadata = {
  title: "Pepiti | MXB Servers",
  description: "MXB Servers aggregated from Pepiti and INConnect by Insane.",
}

export default async function Page() {
  const pepitiServers = await GetAllPepitiServers()

  const servers = processMXBServers(pepitiServers)

  return (
    <PageLayout
      width="app"
      header={{
        title: "MXB Servers",
        extra: <Link href="/dashboard">Go back</Link>,
      }}
    >
      <MXBServers servers={servers} />
    </PageLayout>
  )
}
