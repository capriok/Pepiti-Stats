import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import BannedBanner from './components/BannedBanner'
import { RiderProfile } from './components/RiderProfile'

export default async function Page({ params: { guid } }) {
  const rider = await Api.GetRider(guid)

  return (
    <>
      <PageHeader
        title="Rider Profile"
        extra={<BannedBanner banned={rider.banned} reason={rider.banned_by} />}
      />
      <RiderProfile rider={rider} />
    </>
  )
}
