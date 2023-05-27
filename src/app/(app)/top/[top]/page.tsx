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

  const Renderer = () => {
    const props = {
      pageSize: 25,
      paginationEnabled: true,
      searchEnabled: true,
    }
    switch (top) {
      case "riders":
        return <WorldRecordsTable worldRecords={topRecords} seeMore={false} {...props} />
      case "mmr":
        return <MMRRecordsTable worldMMR={topRecords} seeMore={false} {...props} />
      case "sr":
        return <SRRecordsTable worldSR={topRecords} seeMore={false} {...props} />
      case "bikes":
        return <BikeRecordsTable worldBikes={topRecords} seeMore={false} {...props} />
      case "contacts":
        return <ContactRecordsTable worldContacts={topRecords} seeMore={false} {...props} />
      default:
        return <></>
    }
  }

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
      <Renderer />
    </div>
  )
}

const dynamicDataMap = {
  riders: {
    title: "World Records",
  },
  mmr: {
    title: "MMR Standings",
  },
  sr: {
    title: "SR Standings",
  },
  bikes: {
    title: "Bike Records",
  },
  contacts: {
    title: "Contact Riders",
  },
}
