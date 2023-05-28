import { GetRider, GetRiderLeagues, GetRiderMMRHistory } from "~/api"
import getAuthUser from "~/api/getAuthUser"
import PageHeader from "~/components/PageHeader"
import BannedBanner from "./components/BannedBanner"
import { RiderProfile } from "./components/RiderProfile"

export async function generateMetadata({ params }) {
  const rider = await GetRider(params.guid)

  return {
    title: `Pepiti | ${rider?.name}`,
    description: `Online: ${rider?.online}
MMR: ${rider?.MMR}
SR: ${rider?.SR}
Contacts: ${rider?.contact}
    `,
    openGraph: {
      images: rider.avatar ? [rider.avatar] : [],
    },
  }
}

export default async function Page({ params: { guid } }) {
  const user = await getAuthUser()
  const rider = await GetRider(guid)
  const mmrHistory = await GetRiderMMRHistory(guid)

  // ! this should be removed and moved to swr in the league tab. see there for more
  const leagueData = await GetRiderLeagues(user.token)

  return (
    <>
      <PageHeader
        title="Rider Profile"
        extra={<BannedBanner banned={rider.banned} reason={rider.banned_by} />}
      />
      <RiderProfile
        user={user}
        rider={rider}
        mmrHistory={mmrHistory.MMR_updates}
        leagues={leagueData.leagues}
      />
    </>
  )
}
