import { GetRider, GetRiderMMRHistory } from "~/api"
import PageLayout from "~/components/PageLayout"
import AdminControls from "./components/AdminControls"
import BannedBanner from "./components/BannedBanner"
import { RiderProfile } from "./components/RiderProfile"

export async function generateMetadata({ params }) {
  const rider = await GetRider(params.guid)

  const reasonMap = {
    sr: "Safety Rating Banned (Temporary)",
    global: "Globally Banned (Permanent)",
    "": "Banned (Appealable)",
  }

  const bannedDescription = `Rider: ${rider?.name}
Banned: True
Reason: ${rider?.banned_by}
Remedy: ${reasonMap[rider?.banned_by?.toLowerCase() ?? ""]}`

  const riderDescription = `Rider: ${rider?.name}
Online: ${rider?.online}
MMR: ${rider?.MMR}
SR: ${rider?.SR}
Contacts: ${rider?.contact}`

  return {
    title: `Pepiti | Profile`,
    description: rider.banned ? bannedDescription : riderDescription,
    openGraph: {
      images: rider.avatar ? [rider.avatar] : [],
    },
  }
}

export default async function Page({ params: { guid } }) {
  const rider = await GetRider(guid)
  const mmrHistory = await GetRiderMMRHistory(guid)

  return (
    <PageLayout
      width="app"
      header={{
        title: "Rider Profile",
        extra: <AdminControls rider={rider} />,
      }}
    >
      <BannedBanner banned={rider.banned} reason={rider.banned_by} />
      <RiderProfile rider={rider} mmrHistory={mmrHistory.MMR_updates} />
    </PageLayout>
  )
}
