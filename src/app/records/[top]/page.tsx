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
  const topRecords = await GetDynamicTopRecords(top, 100)

  if (!dynamicTitleMap[top]) return <Result title="Not Found" description="No records found" />

  return (
    <PageLayout
      width="app"
      header={{
        backEnabled: true,
        title: `${dynamicTitleMap[top].title}`,
      }}
    >
      <DynamicTableRenderer top={top} records={topRecords} />
    </PageLayout>
  )
}

const dynamicTitleMap = {
  riders: {
    dataKey: "riders",
    title: "Record Holders",
  },
  mmr: {
    dataKey: "riders",
    title: "MMR Rankings",
  },
  sr: {
    dataKey: "riders",
    title: "Safety Rankings",
  },
  contacts: {
    dataKey: "riders",
    title: "Contact Rankings",
  },
  bikes: {
    dataKey: "bikes",
    title: "Bike Rankings",
  },
}
