import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import WorldRecordsTable from '~/components/tables/WorldRecordsTable'
import MMRRecordsTable from '~/components/tables/MMRRecordsTable'
import SRRecordsTable from '~/components/tables/SRRecordsTable'

export async function generateMetadata({ params }) {
  const recordMap = {
    riders: 'World',
    mmr: 'MMR',
    sr: 'SR',
  }

  return {
    title: `Pepiti | Records`,
    description: `Top ${recordMap[params.top]} Records`,
  }
}

export default async function Page({ params: { top } }) {
  const topRecords = await Api.GetDynamicTopRecords(top, 1000)

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
            pageSize={25}
            paginationEnabled={true}
            searchEnabled={true}
            centeredEnabled={false}
          />
        )
      case 'mmr':
        return (
          <MMRRecordsTable
            worldMMR={topRecords}
            seeMore={false}
            pageSize={25}
            paginationEnabled={true}
            searchEnabled={true}
            centeredEnabled={false}
          />
        )
      case 'sr':
        return (
          <SRRecordsTable
            worldSR={topRecords}
            seeMore={false}
            pageSize={25}
            paginationEnabled={true}
            searchEnabled={true}
            centeredEnabled={false}
          />
        )
      default:
        return <></>
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
      <Renderer />
    </div>
  )
}
