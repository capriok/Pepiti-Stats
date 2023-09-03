import Table from "~/ui/Table"
import RiderSafetyStatsRow from "~/components/tables/expandable/RiderSafetyStatsRow"
import { recentRaceStandingsColumnsWithControls } from "~/components/tables/data/recentRaceStandings"

interface Props {
  standings: any
}

export default function RaceStandings({ standings }: Props) {
  const sortKeys = ["position", "gap", "raceTime", "laps", "penalty", "fastestLap"]

  return (
    <>
      <Table
        data={standings}
        columns={recentRaceStandingsColumnsWithControls}
        defaultPageSize={standings.length}
        sortingKeys={sortKeys}
        expandable={{
          render: (row) => <RiderSafetyStatsRow row={row} />,
        }}
      />
    </>
  )
}
