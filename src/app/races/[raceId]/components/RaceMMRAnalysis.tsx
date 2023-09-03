import Table from "~/ui/Table"
import RiderRecentRacesTableRow from "~/components/tables/expandable/RiderRecentRacesTableRow"
import { recentRaceMmrStandingsColumnsWithControls } from "~/components/tables/data/recentRaceMmrStandings"

interface Props {
  standings: any
}

export default function RaceMMRAnalysis({ standings }: Props) {
  const sortKeys = ["mmrGain", "newMmr", "bpp", "prb", "nrb", "fl", "hs"]

  return (
    <Table
      data={standings}
      columns={recentRaceMmrStandingsColumnsWithControls}
      defaultPageSize={standings.length}
      sortingKeys={sortKeys}
      expandable={{
        render: (row) => <RiderRecentRacesTableRow row={row} />,
      }}
    />
  )
}
