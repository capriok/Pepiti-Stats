import RiderLink from "~/components/RiderLink"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import { handleLapTimes } from "~/utils/handleLapTimes"

export const trackRecordsData = (records) =>
  records.map((r) => ({
    ...r,
    name: r.rider_name,
  }))

export const trackRecordsColumns = [
  {
    key: "name",
    label: "Name",
    render: (name, row, index) => (
      <div className={`${index < 3 ? "py-4" : ""} whitespace-nowrap`}>
        <RiderLink href={`/profile/${row.rider_guid}`} name={name} />
      </div>
    ),
  },
  {
    key: "lap_time",
    label: "Lap Time",
    render: (lapTime) => handleLapTimes(lapTime),
  },
  {
    key: "split_1",
    label: "Split 1",
    render: (split) => handleLapTimes(split),
  },
  {
    key: "split_2",
    label: "Split 2",
    render: (split) => handleLapTimes(split),
  },
  {
    key: "average_speed",
    label: "Avg Speed",
    render: (averageSpeed) => handleAverageSpeed(averageSpeed),
  },
  {
    key: "bike",
    label: "Bike",
    render: (bike) => (
      <div className="whitespace-nowrap">
        <BikeTicTac bike={bike} />
      </div>
    ),
  },
]

export const worldRecordsColumnsWithControls = [
  {
    key: "name",
    label: "Name",
    render: (name, row, index) => (
      <div className={`${index < 3 ? "py-4" : ""} whitespace-nowrap`}>
        <RiderLink href={`/profile/${row.rider_guid}`} name={name} />
      </div>
    ),
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "lap_time",
    label: "Lap Time",
    render: (lapTime) => handleLapTimes(lapTime),
  },
  {
    key: "split_1",
    label: "Split 1",
    render: (split) => handleLapTimes(split),
  },
  {
    key: "split_2",
    label: "Split 2",
    render: (split) => handleLapTimes(split),
  },
  {
    key: "average_speed",
    label: "Avg Speed",
    render: (averageSpeed) => handleAverageSpeed(averageSpeed),
  },
  {
    key: "bike",
    label: "Bike",
    render: (bike) => (
      <div className="whitespace-nowrap">
        <BikeTicTac bike={bike} />
      </div>
    ),
  },
]
