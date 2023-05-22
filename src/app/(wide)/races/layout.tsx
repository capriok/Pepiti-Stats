import Api from '~/api'
import DesktopTrackList from './components/DesktopTrackList'
import MobileTrackList from './components/MobileTrackList'

export default async function RaceLayout(props) {
  const raceData = await Api.GetRecentRaces()

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <MobileTrackList races={raceData.races} />
        <DesktopTrackList races={raceData.races} />
        <div className=" w-full px-4 pt-2 lg:min-h-screen">{props.children}</div>
      </div>
    </>
  )
}
