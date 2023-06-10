import { RiderWorldRecordsStats } from "~/components/tables/expandable/RiderWorldRecordsStats"
import RiderRecordsTable from "./components/RiderRecordsTable"

interface Props {
  rider: RiderProfile
}

export default function RecordsTab({ rider }: Props) {
  return (
    <div className="p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">World Record Stats</div>
      <div className="mb-4">
        <RiderWorldRecordsStats rider={rider} />
      </div>
      <div className="my-4 whitespace-nowrap text-xl font-semibold">Personal Records</div>
      <RiderRecordsTable guid={rider._id} />
    </div>
  )
}
