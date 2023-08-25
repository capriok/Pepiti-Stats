import { GetRider, GetRiderMMRHistory } from "~/api"
import PageLayout from "~/components/PageLayout"
import AdminControls from "./components/AdminControls"
import BannedBanner from "./components/BannedBanner"
import { RiderProfile } from "./components/RiderProfile"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"
import { handleReasonRemedy } from "~/utils/handleReasonRemedy"

export async function generateMetadata({ params }) {
  const rider = await GetRider(params.guid)

  const bannedData = {
    title: `Pepiti | Profile`,
    description: `Rider: ${handleRacismSanitization(rider?.name)}
Banned: True
Reason: ${rider?.banned_by}
Remedy: ${handleReasonRemedy(rider?.banned_by)}`,
    openGraph: {
      images: rider.avatar ? [rider.avatar] : [],
    },
  }

  const riderData = {
    title: `Pepiti | Profile`,
    description: `Rider: ${handleRacismSanitization(rider?.name)}
Online: ${rider?.online}
MMR: ${rider?.MMR}
SR: ${rider?.SR}
Contacts: ${rider?.contact}`,
    openGraph: {
      images: rider.avatar ? [rider.avatar] : [],
    },
  }

  return rider.banned ? bannedData : riderData
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
