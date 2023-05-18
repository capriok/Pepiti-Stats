import { Suspense } from 'react'
import Api from '~/api/api'
import PageHeader from '~/components/PageHeader'
import RiderSearch from './components/RiderSearch'
import SummaryStats from './components/Summary'
import TrackRecords from './components/TrackRecords'
import WorldRecordsTable from '~/components/tables/WorldRecordsTable'
import MMRRecordsTable from '~/components/tables/MMRRecordsTable'
import SRRecordsTable from '~/components/tables/SRRecordsTable'
import DonationMarquee from '~/components/DonationMarquee'

export default async function Page() {
  const apiStats = await Api.GetSummaryStats()
  const worldRecords = await Api.GetDynamicTopRecords('riders', 10)
  const worldMMR = await Api.GetDynamicTopRecords('mmr', 10)
  const worldSR = await Api.GetDynamicTopRecords('sr', 10)
  const trackList = await Api.GetTrackNames()

  return (
    <>
      <PageHeader
        title="Dashboard"
        extra={
          <Suspense fallback={<></>}>
            <RiderSearch />
          </Suspense>
        }
      />

      <div className="flex flex-col gap-10 w-full mx-auto py-5">
        <SummaryStats stats={apiStats} />

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <h3 className="text-lg font-semibold pb-2">Top Records</h3>
            <WorldRecordsTable worldRecords={worldRecords} seeMore />
          </div>
          <div>
            <h3 className="text-lg font-semibold pb-2">Top MMR</h3>
            <MMRRecordsTable worldMMR={worldMMR} seeMore />
          </div>
          <div>
            <h3 className="text-lg font-semibold pb-2">Top SR</h3>
            <SRRecordsTable worldSR={worldSR} seeMore />
          </div>
        </div>

        <TrackRecords trackList={trackList.tracks} />

        <div className="mt-10">{/* <DonationMarquee /> */}</div>
      </div>
    </>
  )
}
