import Spinner from "~/components/Spinner"
import BikeTicTac from "~/components/pills/BikeTicTac"
import Pill from "~/components/pills/Pill"

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

export const bikeRecordsColumnsWithControls = [
  {
    key: "name",
    label: "Bike",
    render: (name) => <BikeTicTac bike={name} />,
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
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
