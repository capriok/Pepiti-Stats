import { GetDynamicTopRecords } from '~/api'
import PageHeader from '~/components/PageHeader'
import WorldRecordsTable from '~/components/tables/WorldRecordsTable'
import MMRRecordsTable from '~/components/tables/MMRRecordsTable'
import SRRecordsTable from '~/components/tables/SRRecordsTable'
import BikeRecordsTable from "~/components/tables/BikeRecordsTable"
import ContactRecordsTable from "~/components/tables/ContactRecordsTable"

export async function generateMetadata({ params: { top } }) {
  return {
    title: `Pepiti | Records`,
    description: `Top ${dynamicDataMap[top].title}`,
  }
}

export default async function Page({ params: { top } }) {
  const topRecords = await GetDynamicTopRecords(top, 1000)
  console.log("%cDynamicTopRecords", "color: steelblue", topRecords)

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <PageHeader
        title="Global Records"
        extra={
          <div className="flex gap-2 whitespace-nowrap font-semibold">
            <div>Top {dynamicDataMap[top].title}</div>
          </div>
        }
      />
      {dynamicDataMap[top].render(topRecords)}
    </div>
  )
}

const tableProps = {
  pageSize: 25,
  paginationEnabled: true,
  searchEnabled: true,
}
const dynamicDataMap = {
  riders: {
    title: "World Records",
    render: (records) => {
      return <WorldRecordsTable worldRecords={records} seeMore={false} {...tableProps} />
    },
  },
  mmr: {
    title: "MMR Standings",
    render: (records) => {
      return <MMRRecordsTable worldMMR={records} seeMore={false} {...tableProps} />
    },
  },
  sr: {
    title: "SR Standings",
    render: (records) => {
      return <SRRecordsTable worldSR={records} seeMore={false} {...tableProps} />
    },
  },
  bikes: {
    title: "Bike Records",
    render: (records) => {
      return <BikeRecordsTable worldBikes={records} seeMore={false} {...tableProps} />
    },
  },
  contacts: {
    title: "Contact Riders",
    render: (records) => {
      return <ContactRecordsTable worldContacts={records} seeMore={false} {...tableProps} />
    },
  },
}