import Link from 'next/link'
import ReportsList from './components/ReportsList'
import PageHeader from '~/components/PageHeader'
import { GetAdminRiderReports } from '~/api'
import getAuthUser from '~/api/getAuthUser'
import Tabs from "~/components/Tabs"

export const metadata = {
  title: "Pepiti | Admin Manager",
  description: "Manage submitted rider reports",
}

export default async function Page() {
  const user = await getAuthUser()
  const openReports = await GetAdminRiderReports(user.token, "open")
  const closedReports = await GetAdminRiderReports(user.token, "closed")

  const items = [
    {
      key: "open",
      label: "Open",
      children: <ReportsList reports={openReports.results} />,
    },
    {
      key: "closed",
      label: "Closed",
      children: <ReportsList reports={closedReports.results} />,
    },
  ]

  return (
    <>
      <PageHeader
        title="Rider Reports"
        extra={
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
        }
      />
      <div className="card card-body p-0">
        <Tabs items={items} wide={true} />
      </div>
    </>
  )
}
