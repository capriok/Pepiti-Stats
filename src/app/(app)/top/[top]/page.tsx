import Api from '~/api'
import useAuthUser from '~/utils/useAuthUser'
import PageHeader from '~/components/PageHeader'
import Table from '~/components/Table'
import WorldRecordsTable from '~/components/tables/WorldRecordsTable'
import MMRRecordsTable from '~/components/tables/MMRRecordsTable'
import SRRecordsTable from '~/components/tables/SRRecordsTable'

export default async function Page({ params: { top } }) {
  const topRecords = await Api.GetDynamicTopRecords(top, 1000)
  console.log(top)
  console.log(topRecords)

  const data = () => {
    switch (top) {
      case 'riders':
        return Object.keys(topRecords.riders)
      case 'mmr':
        return topRecords.bikes
      case 'sr':
        return topRecords.donators.filter((rider) => rider.donation > 0)

      default:
        return topRecords.riders
    }
  }

  const Renderer = () => {
    switch (top) {
      case 'riders':
        return (
          <WorldRecordsTable
            worldRecords={topRecords}
            seeMore={false}
            centeredEnabled={true}
            searchEnabled={true}
            paginationEnabled={true}
          />
        )
      case 'mmr':
        return (
          <MMRRecordsTable
            worldMMR={topRecords}
            seeMore={false}
            centeredEnabled={true}
            searchEnabled={true}
            paginationEnabled={true}
          />
        )
      case 'sr':
        return (
          <SRRecordsTable
            worldSR={topRecords}
            seeMore={false}
            centeredEnabled={true}
            searchEnabled={true}
            paginationEnabled={true}
          />
        )
      default:
        return <></>
        break
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <PageHeader
        title="Rider Report"
        extra={
          <div className="flex gap-2 whitespace-nowrap text-lg">
            <div>Top {data()?.length}</div>
            <div className="uppercase">{top === 'riders' ? 'World Records' : top}</div>
          </div>
        }
      />

      {top === 'contacts' && (
        <p className="text-center text-red-500">
          You don&apos;t want to be here, you are at risk of a timeout or even a ban. If you have an
          SR under 900 you will be banned.
        </p>
      )}

      <Renderer />
    </div>
  )
}
