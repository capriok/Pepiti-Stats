import Link from "next/link"
import { GetDynamicTopRecords } from "~/api"
import PageHeader from "~/components/PageHeader"
import Result from "~/components/Result"
import DynamicTableRenderer from "./components/DynamicTableRenderer"

export async function generateMetadata({ params: { top } }) {
  if (!dynamicTitleMap[top]) return { title: "Not Found" }

  return {
    title: `Pepiti | Top Records`,
    description: `Top ${dynamicTitleMap[top].title}`,
  }
}

export default async function Page({ params: { top } }) {
  const topRecords = await GetDynamicTopRecords(top, 1000)
  console.log(top)

  if (!dynamicTitleMap[top]) return <Result title="Not Found" description="No records found" />

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <PageHeader
        title={`Top ${dynamicTitleMap[top].title}`}
        extra={
          <Link href="/records" className="no-underline">
            Go back
          </Link>
        }
      />
      <DynamicTableRenderer top={top} records={topRecords} />
    </div>
  )
}

const dynamicTitleMap = {
  riders: {
    dataKey: "riders",
    title: "World Records",
  },
  mmr: {
    dataKey: "riders",
    title: "MMR Rankings",
  },
  sr: {
    dataKey: "riders",
    title: "SR Rankings",
  },
  bikes: {
    dataKey: "bikes",
    title: "Bike Records",
  },
  contacts: {
    dataKey: "riders",
    title: "Contact Riders",
  },
}
