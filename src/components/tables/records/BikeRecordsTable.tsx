"use client"

import useSwr from "swr"
import Spinner from "~/components/Spinner"
import BikeTicTac from "~/components/pills/BikeTicTac"
import Pill from "~/components/pills/Pill"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  worldBikes: any
  totalLaps: number
}

export default function BikeRecordsTable({ worldBikes, totalLaps, ...rest }: Props) {
  const data = worldBikes.bikes.map((bike) => {
    const ratio = totalLaps ? (bike.laps / totalLaps) * 100 : 0
    return {
      _id: bike.name + bike.laps,
      name: bike.name,
      laps: bike.laps,
      ratio: ratio,
    }
  })
  // console.log("%cBikeRecordsTable", "color: steelblue", { worldBikes: data })

  const columns = [
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

  const sortKeys = ["laps", "ratio"]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} sortingKeys={sortKeys} {...rest} />
    </div>
  )
}
