import { GetDynamicTopRecords, GetSummaryStats, GetTrackNames } from "~/api"
import PageLayout from "~/components/PageLayout"
import RiderSearch from "./components/RiderSearch"
import SummaryStats from "./components/Summary"
import TopRecords from "./components/TopRecords"
import TrackWorldRecords from "./components/TrackWorldRecords"
import GeneralEventAlert from "~/components/alerts/GeneralEventAlert"

import applicationAlerts from "@/data/application-alerts.json"

export const metadata = {
  title: "Pepiti | Dashboard",
  description:
    "Access race stats in real-time, compete in race leagues, track fellow racers through feature packed profiles, and compete with rivals through global leaderboards",
}

export default async function Page() {
  const apiStats = await GetSummaryStats()
  const worldRecords = await GetDynamicTopRecords("riders", 100)
  const worldMMR = await GetDynamicTopRecords("mmr", 100)
  const worldSR = await GetDynamicTopRecords("sr", 100)
  const trackList = await GetTrackNames()

  const alert = applicationAlerts.alerts["FinnsFarm"]

  return (
    <PageLayout
      width="app"
      header={{
        title: "Dashboard",
        extra: <RiderSearch />,
      }}
    >
      <div className="mx-auto flex w-full flex-col gap-6 md:gap-12">
        <GeneralEventAlert alert={alert} />

        <SummaryStats stats={apiStats} />

        <TopRecords worldRecords={worldRecords} worldMMR={worldMMR} worldSR={worldSR} />

        <TrackWorldRecords tracks={trackList.tracks.sort((a, b) => a.name.localeCompare(b.name))} />
      </div>
    </PageLayout>
  )
}
