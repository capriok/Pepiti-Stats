import { GetDynamicTopRecords } from "~/api"
import PageHeader from "~/components/PageHeader"
import WorldRecordsTable from "~/components/tables/WorldRecordsTable"
import MMRRecordsTable from "~/components/tables/MMRRecordsTable"
import SRRecordsTable from "~/components/tables/SRRecordsTable"
import BikeRecordsTable from "~/components/tables/BikeRecordsTable"
import ContactRecordsTable from "~/components/tables/ContactRecordsTable"
import Result from "~/components/Result"

export async function generateMetadata({ params: { top } }) {
  return {
    title: `Pepiti | Records`,
    description: dynamicDataMap[top] ? `Top ${dynamicDataMap[top].title}` : "",
  }
}

export default async function Page({ params: { top } }) {
  const topRecords = await GetDynamicTopRecords(top, 1000)

  if (!dynamicDataMap[top]) return <Result title="Not Found" description="No records found" />

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
  defaultPageSize: 25,
  searchEnabled: true,
  paginationEnabled: true,
  jumpToEnabled: true,
}
const dynamicDataMap = {
  riders: {
    title: "World Records",
    render: (records) => {
      return <WorldRecordsTable worldRecords={records} {...tableProps} />
    },
  },
  mmr: {
    title: "MMR Standings",
    render: (records) => {
      return <MMRRecordsTable worldMMR={records} {...tableProps} />
    },
  },
  sr: {
    title: "SR Standings",
    render: (records) => {
      return <SRRecordsTable worldSR={records} {...tableProps} />
    },
  },
  bikes: {
    title: "Bike Records",
    render: (records) => {
      return <BikeRecordsTable worldBikes={records} {...tableProps} />
    },
  },
  contacts: {
    title: "Contact Riders",
    render: (records) => {
      return <ContactRecordsTable worldContacts={records} {...tableProps} />
    },
  },
}
