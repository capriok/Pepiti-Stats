import useSWR from "swr"
import RiderRacesTable from "./components/RiderRacesTable"

interface Props {
  rider: RiderProfile
}

export default function RacesTab({ rider }: Props) {
  return (
    <div className="p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">Recent Races</div>
      <RiderRacesTable guid={rider._id} />
    </div>
  )
}
