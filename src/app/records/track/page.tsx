import Link from "next/link"
import { GetTrackNames } from "~/api"
import TrackRecords from "~/app/dashboard/components/TrackRecords"
import PageLayout from "~/components/PageLayout"

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
        title: "Track Records",
        extra: (
          <Link href="/records" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <TrackRecords
        trackList={trackList.tracks}
        table={{
          defaultPageSize: 100,
        }}
      />
    </PageLayout>
  )
}
