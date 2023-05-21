import Api from '~/api'
import DesktopTrackList from './components/DesktopTrackList'
import MobileTrackList from './components/MobileTrackList'

export const metadata = {
  title: 'Pepiti Stats',
  description: 'MX Bikes Stats',
  keywords: 'Pepiti, MX Bikes Stats, MX Bikes, Stats, MXBikes, MXBikes Stats, MXB Mods',
}

export default async function RootLayout(props) {
  const raceData = await Api.GetRecentRaces()

  return (
    <div className="mx-auto w-full flex-1 px-2 lg:px-0">
      <div className="relative flex flex-col lg:flex-row">
        <MobileTrackList races={raceData.races} />
        <DesktopTrackList races={raceData.races} />
        <div className="flex w-full p-2 lg:min-h-screen">{props.children}</div>
      </div>
    </div>
  )
}
