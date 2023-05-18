import Api from '~/api/api'
import PageHeader from '~/components/PageHeader'
import { MobileTrackList as MobileTrackList } from './components/RecentRaceDrawer'

export default async function Page() {
  const raceData = await Api.GetRecentRaces()

  return (
    <>
      <PageHeader title="Races" />
      <MobileTrackList races={raceData.races} />
    </>
  )
}
