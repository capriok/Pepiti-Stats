import Api from '~/api'
import { DesktopTrackList } from './components/DesktopTrackList'
import { MobileTrackList } from './components/MobileTrackList'

export const metadata = {
  title: 'Pepiti Stats',
  description: 'MX Bikes Stats',
  keywords: 'Pepiti, MX Bikes Stats, MX Bikes, Stats, MXBikes, MXBikes Stats, MXB Mods',
}

export default async function RootLayout(props) {
  const raceData = await Api.GetRecentRaces()

  return (
    <div className="mx-auto w-full flex-1 px-2 md:px-0">
      <div className="relative flex">
        {/* <MobileTrackList races={raceData.races} /> */}
        <DesktopTrackList races={raceData.races} />

        <div className="flex min-h-screen w-full p-2">{props.children}</div>
      </div>
    </div>
  )
}
