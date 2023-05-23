import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import RiderSearch from './components/RiderSearch'
import SummaryStats from './components/Summary'
import TrackRecords from './components/TrackRecords'
import WorldRecordsTable from '~/components/tables/WorldRecordsTable'
import MMRRecordsTable from '~/components/tables/MMRRecordsTable'
import SRRecordsTable from '~/components/tables/SRRecordsTable'

export const metadata = {
  title: 'Pepiti | Dashboard',
  description:
    'Access race stats in real-time, host and join leagues, connect with fellow races through social integrations, and compete with rivals through global leaderboards',
}

export default async function Page() {
  const apiStats = await Api.GetSummaryStats()
  const worldRecords = await Api.GetDynamicTopRecords('riders', 10)
  const worldMMR = await Api.GetDynamicTopRecords('mmr', 10)
  const worldSR = await Api.GetDynamicTopRecords('sr', 10)
  const trackList = await Api.GetTrackNames()

  return (
    <>
      <PageHeader title="Dashboard" extra={<RiderSearch />} />

      <div className="mx-auto flex w-full flex-col gap-10">
        <SummaryStats stats={apiStats} />

        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <div className="pb-2 text-lg font-semibold">Top Records</div>
            <WorldRecordsTable worldRecords={worldRecords} seeMore />
          </div>
          <div>
            <div className="pb-2 text-lg font-semibold">Top MMR</div>
            <MMRRecordsTable worldMMR={worldMMR} seeMore />
          </div>
          <div>
            <div className="flex items-center gap-2 pb-2">
              <div className="text-lg font-semibold">Top SR</div>
              <div className="text-sm text-accent">(Safety Rating)</div>
            </div>
            <SRRecordsTable worldSR={worldSR} seeMore />
          </div>
        </div>

        <TrackRecords trackList={trackList.tracks} />
      </div>
    </>
  )
}
