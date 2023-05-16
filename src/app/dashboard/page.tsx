import Api from '~/api/api'
import PageHeader from '~/components/PageHeader'
import RiderTrackSearch from './components/RiderTrackSearch'
import SummaryStats from './components/Summary'
import TopTracks from './components/TopTracks'
import TopWorldRecords from '~/components/tables/TopWorldRecords'
import TopMMR from '~/components/tables/TopMMR'
import TopSR from '~/components/tables/TopSR'

export default async function Page() {
  const apiStats = await Api.GetSummaryStats()
  const trackList = await Api.GetTrackNames()
  const worldRecords = await Api.GetDynamicTopRecords('riders', 10)
  const worldMMR = await Api.GetDynamicTopRecords('mmr', 10)
  const worldSR = await Api.GetDynamicTopRecords('sr', 10)

  return (
    <>
      <PageHeader title="Dashboard" extra={<RiderTrackSearch tracksData={trackList?.tracks} />} />

      <div className="flex flex-col gap-10 w-full mx-auto py-5">
        <SummaryStats stats={apiStats} />

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <h3 className="pb-2">Top Records</h3>
            <TopWorldRecords worldRecords={worldRecords} seeMore />
          </div>
          <div>
            <h3 className="pb-2">Top MMR</h3>
            <TopMMR worldMMR={worldMMR} seeMore />
          </div>
          <div>
            <h3 className="pb-2">Top SR</h3>
            <TopSR worldSR={worldSR} seeMore />
          </div>
        </div>

        <TopTracks trackList={trackList.tracks} />
      </div>
    </>
  )
}
