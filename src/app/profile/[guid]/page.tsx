"use server"

import { GetRider, GetRiderMMRHistory } from "~/api"
import PageLayout from "~/components/PageLayout"
import Result from "~/components/Result"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"
import { handleReasonRemedy } from "~/utils/handleReasonRemedy"
import AdminControls from "./components/AdminControls"
import BannedBanner from "./components/BannedBanner"
import { RiderProfile } from "./components/RiderProfile"
import { Button } from "~/ui/Button"
import Link from "next/link"

export async function generateMetadata({ params }) {
  const rider = await GetRider(params.guid)

  if (!rider) {
    return {
      title: `Pepiti | Profile`,
      description: `Rider: Not Found`,
    }
  }

  const bannedDescription = `GUID: ${rider?._id}
  Rider: ${handleRacismSanitization(rider?.name)}
  Banned: True
  Reason: ${rider?.banned_by ?? "N/a"}
  Detail: ${rider?.banned ? handleReasonRemedy(rider?.banned_by) : "N/a"}`

  const riderDescription = `Rider: ${handleRacismSanitization(rider?.name)}
  Online: ${rider?.online ? "Online" : "Offline"}
  MMR: ${rider?.MMR?.toLocaleString()}
  SR: ${rider?.SR?.toLocaleString()}
  Contacts: ${rider?.contact?.toLocaleString()}`

  const description = rider?.banned ? bannedDescription : riderDescription

  return {
    title: `Pepiti | Profile`,
    description: description,
    openGraph: {
      images: rider?.avatar ? [rider?.avatar] : [],
    },
  }
}

export default async function Page({ params: { guid } }) {
  const rider = await GetRider(guid)

  const NotFound = (
    <Result
      title="Not Found"
      description={`Please check the GUID in the URL and try again.`}
      extra={
        <>
          <Link href="/profile">
            <Button>Rider Search</Button>
          </Link>
        </>
      }
    />
  )

  if (!rider._id) return NotFound

  const mmrHistory = await GetRiderMMRHistory(guid)

  if (!mmrHistory) return NotFound

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
