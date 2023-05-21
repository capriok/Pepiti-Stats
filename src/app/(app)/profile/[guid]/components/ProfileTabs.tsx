import Tabs from '~/components/Tabs'
import RiderWorldRecordsTable from './tabs/RiderWorldRecordsTable'
import RiderMMRHistoryChart from './tabs/RiderMMRHistoryChart'
import RiderRacesTable from './tabs/RiderRacesTable'
import RiderRecordsTable from './tabs/RiderRecordsTable'
import Api from '~/api'

interface Props {
  rider: RiderProfile
  mmrHistory: Array<RiderMMRHistory>
}

export default function ProfileTabs({ rider, mmrHistory }: Props) {
  const items = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <div className="flex min-h-[420px] flex-col gap-5 lg:flex-row">
          <RiderWorldRecordsTable worldRecords={rider.world_records} />
          <RiderMMRHistoryChart mmrHistory={mmrHistory} />
        </div>
      ),
    },
    {
      key: 'races',
      label: 'Races',
      children: (
        <div className="p-6 pt-0">
          <div className="my-4 whitespace-nowrap text-xl font-semibold">Recent Races</div>
          <RiderRacesTable guid={rider._id} />
        </div>
      ),
    },
    {
      key: 'records',
      label: 'Records',
      children: (
        <div className="p-6 pt-0">
          <div className="my-4 whitespace-nowrap text-xl font-semibold">Personal Records</div>
          <RiderRecordsTable guid={rider._id} />
        </div>
      ),
    },
  ]
  return (
    <div className="card-body mt-10 rounded-lg bg-base-200 p-0">
      <Tabs items={items} wide={true} />
    </div>
  )
}
