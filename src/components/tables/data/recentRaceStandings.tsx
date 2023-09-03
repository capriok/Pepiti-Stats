import RiderLink from "~/components/RiderLink"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
import { handleRaceGap } from "~/utils/handleRaceGap"
import { handleLapTimes } from "~/utils/handleLapTimes"

export const recentRaceStandingsColumnsWithControls = [
  {
    key: "raceNumber",
    label: "Race #",
    render: (raceNumber) => (
      <div className="flex gap-1">
        <div className="text-accent"># </div>
        <div className="text-primary">{raceNumber}</div>
      </div>
    ),
  },
  {
    key: "name",
    label: "Name",
    render: (name, row) => <RiderLink href={`/profile/${row._id}`} name={name} />,
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "position",
    label: "Position",
    render: (position) => (position ? <b>{handlePlaceSuffix(position)}</b> : "-"),
  },
  {
    key: "gap",
    label: "Gap",
    render: (gap) => (gap !== undefined ? handleRaceGap(gap) : "-"),
  },
  {
    key: "raceTime",
    label: "Race Time",
    render: (raceTime) => (raceTime ? handleLapTimes(raceTime) : "-"),
  },
  {
    key: "laps",
    label: "Laps",
    render: (laps) => (laps ? laps : "-"),
  },
  {
    key: "penalty",
    label: "Penalty",
    render: (penalty) => (penalty ? penalty + " s" : "-"),
  },
  {
    key: "fastestLap",
    label: "Fastest Lap",
    render: (fastestLap) => (fastestLap ? handleLapTimes(fastestLap) : "-"),
  },
]
