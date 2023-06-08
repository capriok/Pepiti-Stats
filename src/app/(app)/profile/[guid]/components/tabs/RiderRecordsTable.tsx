"use client"

import React from "react"
import useSWR from "swr"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import Table from "~/ui/Table"
import Spinner from "~/components/Spinner"
import BikeWithPrefixColor from "~/components/pills/BikeWithPrefixColor"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"

interface Props {
  guid: string
}

export default function RiderRecordsTable({ guid }: Props) {
  const { data: recordsData, isLoading } = useSWR(`/rider/${guid}/records`)

  if (isLoading)
    return (
      <div className="my-5">
        <Spinner />
      </div>
    )
  console.log("%cRiderRecordsTable", "color: steelblue", { records: recordsData.records })

  const records = recordsData.records.map((record) => ({
    _id: record._id,
    date: parseInt(record._id.slice(0, 8), 16) * 1000,
    track: record.track,
    bike: record.bike,
    averageSpeed: record.average_speed,
    split1: record.split_1,
    split2: record.split_2,
    lapTime: record.lap_time,
  }))

  const columns = [
    {
      key: "date",
      label: "Date",
      render: (date) => (dateIsValid(new Date(date)) ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      key: "track",
      label: "Track",
      render: (track) => (track ? track : "-"),
    },
    {
      key: "lapTime",
      label: "Lap Time",
      render: (lapTime) => (lapTime ? handleLapTimes(lapTime) : "-"),
    },
    {
      key: "split1",
      label: "Split 1",
      render: (split1) => (split1 ? handleLapTimes(split1) : "-"),
    },
    {
      key: "split2",
      label: "Split 2",
      render: (split2) => (split2 ? handleLapTimes(split2) : "-"),
    },
    {
      key: "averageSpeed",
      label: "Average Speed",
      render: (averageSpeed) => (averageSpeed ? handleAverageSpeed(averageSpeed) : "-"),
    },
    {
      key: "bike",
      label: "Bike",
      render: (bike) => <BikeWithPrefixColor bike={bike} />,
    },
  ]

  const sortKeys = ["date", "track", "lapTime", "split1", "split2", "averageSpeed"]

  return (
    <Table
      columns={columns}
      data={records}
      searchKey="track"
      rankEnabled={false}
      searchEnabled={true}
      paginationEnabled={true}
      sortingEnabled={true}
      sortingKeys={sortKeys}
    />
  )
}
