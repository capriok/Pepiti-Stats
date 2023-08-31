import Link from "next/link"
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
        title: "World Record Laps",
        extra: (
          <Link href="/records" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <WorldRecords trackList={trackList.tracks.sort((a, b) => a.name.localeCompare(b.name))} />
    </PageLayout>
  )
}
