import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import BannedBanner from './components/BannedBanner'
import { RiderProfile } from './components/RiderProfile'

export async function generateMetadata({ params }) {
  const rider = await Api.GetRider(params.guid)

  return {
    title: `Pepiti | ${rider.name}`,
    description: `Online: ${rider.online}
    \nMMR: ${rider.MMR}
    \nSR: ${rider.SR}
    \nContacts: ${rider.contact}
    `,
    openGraph: {
      images: [rider.avatar],
    },
  }
}

export default async function Page({ params: { guid } }) {
  const user = await useAuthUser()
  const rider = await Api.GetRider(guid)
  const mmrHistory = await Api.GetRiderMMRHistory(guid)

  return (
    <>
      <PageHeader
        title="Rider Profile"
        extra={<BannedBanner banned={rider.banned} reason={rider.banned_by} />}
      />
      <RiderProfile user={user} rider={rider} mmrHistory={mmrHistory.MMR_updates} />
    </>
  )
}
