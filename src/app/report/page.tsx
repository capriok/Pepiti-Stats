import { GetRecentRaces } from "~/api"
import PageLayout from "~/components/PageLayout"
import Pill from "~/components/pills/Pill"
import RiderReportForm from "./components/ReportForm"

export const metadata = {
  title: "Pepiti | Rider Report",
  description: "Report riders from recent events for administrative review",
}

export default async function Page() {
  const recentRaces = await GetRecentRaces()

  return (
    <PageLayout
      width="app"
      header={{
        title: "Rider Report",
        extra: (
          <Pill
            color="red"
            text={<div className="text-sm">Report Abuse and False Claims will get you banned</div>}
          />
        ),
      }}
    >
      {/* @ts-expect-error */}
      <RiderReportForm events={recentRaces.races} />
    </PageLayout>
  )
}
