import Api from '~/api'
import useAuthUser from '~/utils/useAuthUser'
import PageHeader from '~/components/PageHeader'
import { Pill } from '~/components/pills/Pill'
import { RiderReportForm } from './components/ReportForm'

export const metadata = {
  title: 'Pepiti | Rider Report',
  description: 'Report riders from recent events for review by the admin team',
}

export default async function Page() {
  const recentRaces = await Api.GetRecentRaces()
  const user = useAuthUser()

  return (
    <div className="min-h-[90vh]">
      <PageHeader
        title="Rider Report"
        extra={
          <Pill
            color="red"
            text={<div className="text-sm">Report Abuse and False Claims will get your banned</div>}
          />
        }
      />
      <RiderReportForm user={user} events={recentRaces.races} />
    </div>
  )
}
