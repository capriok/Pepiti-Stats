import Link from "next/link"
import { GetTrackNames } from "~/api"
import PageLayout from "~/components/PageLayout"
import WorldRecordLaps from "./components/WorldRecordLaps"

export async function generateMetadata() {
  return {
    title: `Pepiti | Track Records`,
    description: "Track Records for Pepiti servers",
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
      <WorldRecordLaps
        trackList={trackList.tracks.sort((a, b) => a.name.localeCompare(b.name))}
        table={{
          defaultPageSize: 25,
        }}
      />
    </PageLayout>
  )
}
