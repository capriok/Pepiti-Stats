import Link from "next/link"
import { GetAdminRiderReports } from "~/api"
import GetAuthUser from "~/api"
import PageLayout from "~/components/PageLayout"
import Tabs from "~/ui/Tabs"
import OpenReportsList from "./components/OpenReportsList"
import ClosedReportsList from "./components/ClosedReportsList"
import { Card } from "~/ui/Card"

export const metadata = {
  title: "Pepiti | Admin Manager",
}

export default async function Page() {
  const user = await GetAuthUser()
  const openReports = await GetAdminRiderReports(user.token, "open")
  const closedReports = await GetAdminRiderReports(user.token, "closed")

  const items = [
    {
      key: "open",
      label: "Open",
      children: <OpenReportsList reports={openReports.results} />,
    },
    {
      key: "closed",
      label: "Closed",
      children: <ClosedReportsList reports={closedReports.results.sort(sortByDateDescending)} />,
    },
  ]

  return (
    <PageLayout
      width="app"
      header={{
        title: "Rider Reports",
        extra: (
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <Card>
        <Tabs items={items} wide={true} />
      </Card>
    </PageLayout>
  )
}

const sortByDateDescending = (a, b) => {
  const dateA = new Date(parseInt(a._id.slice(0, 8), 16) * 1000)
  const dateB = new Date(parseInt(b._id.slice(0, 8), 16) * 1000)
  return dateB.getTime() - dateA.getTime()
}
