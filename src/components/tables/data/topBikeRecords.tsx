import Spinner from "~/components/Spinner"
import BikeTicTac from "~/components/pills/BikeTicTac"
import Pill from "~/components/pills/Pill"
import { TableColumn } from "~/ui/Table"

export const bikeRecordsData = (bikes, totalLaps = 0) =>
  bikes.map((bike) => {
    const ratio = totalLaps ? (bike.laps / totalLaps) * 100 : 0
    const res = {
      _id: bike.name + bike.laps,
      name: bike.name,
      laps: bike.laps,
      ratio: ratio,
    }
    return res
  })

export const bikeRecordsColumns = [
  {
    key: "name",
    label: "Bike",
    render: (name) => <BikeTicTac bike={name} />,
  },
  {
    key: "laps",
    label: "Laps",
    align: "right",
    render: (laps) => (laps ? laps.toLocaleString() : "-"),
  },
  {
    key: "ratio",
    label: "Total laps %",
    render: (ratio) =>
      ratio ? (
        <Pill
          text={ratio.toFixed(2) + "%"}
          color={ratio > 10 ? "primary" : ratio > 5 ? "yellow" : "info"}
        />
      ) : (
        <Spinner />
      ),
  },
]

export const bikeRecordsColumnsWithControls = bikeRecordsColumns.map((c) => {
  let col = { ...c } as TableColumn

  if (col.key === "name") {
    col = {
      ...col,
      onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
    }
  }
  return col
})
