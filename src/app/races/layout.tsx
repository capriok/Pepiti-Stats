import { GetRecentRaces } from "~/api"
import PageLayout from "~/components/PageLayout"
import DesktopTrackList from "./components/DesktopTrackList"
import MobileTrackList from "./components/MobileTrackList"

export default async function RaceLayout(props) {
  const raceData = await GetRecentRaces()

  return (
    <>
      <div className="-mb-10 flex flex-col lg:flex-row">
        <MobileTrackList races={raceData.races} />
        <DesktopTrackList races={raceData.races} />
        <div className="mb-10 w-full lg:min-h-[90vh]">{props.children}</div>
      </div>
    </>
  )
}
