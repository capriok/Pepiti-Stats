import { GetDynamicTopRecords } from '~/api'
import PageHeader from '~/components/PageHeader'
import WorldRecordsTable from '~/components/tables/WorldRecordsTable'
import MMRRecordsTable from '~/components/tables/MMRRecordsTable'
import SRRecordsTable from '~/components/tables/SRRecordsTable'

export async function generateMetadata({ params: { top } }) {
  return {
    title: `Pepiti | Records`,
    description: `Top ${recordMap[top]}`,
  }
}

export default async function Page({ params: { top } }) {
  const topRecords = await GetDynamicTopRecords(top, 1000)

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
    const props = {
      pageSize: 25,
      paginationEnabled: true,
      searchEnabled: true,
    }

    switch (top) {
      case 'riders':
        return <WorldRecordsTable worldRecords={topRecords} seeMore={false} {...props} />
      case 'mmr':
        return <MMRRecordsTable worldMMR={topRecords} seeMore={false} {...props} />
      case 'sr':
        return <SRRecordsTable worldSR={topRecords} seeMore={false} {...props} />
      default:
        return <></>
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <PageHeader
        title="Rider Report"
        extra={
          <div className="flex gap-2 whitespace-nowrap font-semibold">
            <div>Top {data()?.length}</div>
            <div>{recordMap[top]}</div>
          </div>
        }
      />
      <Renderer />
    </div>
  )
}

const recordMap = {
  riders: 'World Records',
  mmr: 'MMR Standings',
  sr: 'SR Standings',
}
