import { GetTrackNames } from "~/api"
import PageLayout from "~/components/PageLayout"
import WorldRecords from "./components/WorldRecords"

export async function generateMetadata() {
  return {
    title: `Pepiti | World Record Laps`,
    description: "World Record Laps for Pepiti servers",
  }
}

export default async function Page() {
  const trackList = await GetTrackNames()

  return (
    <PageLayout
      width="app"
      header={{
        backEnabled: true,
        title: "World Record Laps",
      }}
    >
      <WorldRecords trackList={trackList.tracks.sort((a, b) => a.name.localeCompare(b.name))} />
    </PageLayout>
  )
}
