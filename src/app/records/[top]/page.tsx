import Link from "next/link"
import { GetDynamicTopRecords } from "~/api"
import PageLayout from "~/components/PageLayout"
import Result from "~/components/Result"
import DynamicTableRenderer from "./components/DynamicTableRenderer"

export async function generateMetadata({ params: { top } }) {
  if (!dynamicTitleMap[top]) return { title: "Not Found" }

  return {
    title: `Pepiti | Top Records`,
    description: `${dynamicTitleMap[top].title}`,
  }
}

export default async function Page({ params: { top } }) {
  const topRecords = await GetDynamicTopRecords(top, 1000)

  if (!dynamicTitleMap[top]) return <Result title="Not Found" description="No records found" />

  return (
    <PageLayout
      width="app"
      header={{
        title: `${dynamicTitleMap[top].title}`,
        extra: (
          <Link href="/records" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <DynamicTableRenderer top={top} records={topRecords} />
    </PageLayout>
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
