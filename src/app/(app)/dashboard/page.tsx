import { GetDynamicTopRecords, GetSummaryStats, GetTrackNames } from "~/api"
import PageHeader from "~/components/PageHeader"
import RiderSearch from "./components/RiderSearch"
import SummaryStats from "./components/Summary"
import TopRecords from "./components/TopRecords"
import TrackRecords from "./components/TrackRecords"

export const metadata = {
  title: "Pepiti | Dashboard",
  description:
    "Access race stats in real-time, host and join leagues, connect with fellow races through social integrations, and compete with rivals through global leaderboards",
}

export default async function Page() {
  const apiStats = await GetSummaryStats()
  const worldRecords = await GetDynamicTopRecords("riders", 30)
  const worldMMR = await GetDynamicTopRecords("mmr", 100)
  const worldSR = await GetDynamicTopRecords("sr", 100)
  const trackList = await GetTrackNames()

  return (
    <>
      <PageHeader title="Dashboard" extra={<RiderSearch />} />

      <div className="mx-auto flex w-full flex-col gap-16">
        <SummaryStats stats={apiStats} />

        <TopRecords worldRecords={worldRecords} worldMMR={worldMMR} worldSR={worldSR} />

        <TrackRecords trackList={trackList.tracks} />
      </div>
    </>
  )
}
