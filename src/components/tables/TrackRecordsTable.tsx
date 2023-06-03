"use client"

import Table from "~/components/Table"
import RiderLink from "../RiderLink"
import BikeWithPrefixColor from "../pills/BikeWithPrefixColor"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"

interface Props {
  records: TrackRecord[]
}

export const TrackRecordsTable = ({ records }: Props) => {
  const data = records.map((r) => ({
    ...r,
    name: r.rider_name,
  }))
  console.log('%cTrackRecordsTable', 'color: steelblue', data);

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (name, row) => <RiderLink href={`/profile/${row.rider_guid}`}>{name}</RiderLink>,
    },
    {
      key: "lap_time",
      label: "Lap Time",
      render: (lapTime) => handleLapTimes(lapTime),
    },
    {
      key: "average_speed",
      label: "Avg Speed",
      render: (averageSpeed) => handleAverageSpeed(averageSpeed),
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
      key: "bike",
      label: "Bike",
      render: (bike) => <BikeWithPrefixColor bike={bike} />,
    },
  ]

  return <Table data={data} columns={columns} searchEnabled={true} paginationEnabled={true} />
}
