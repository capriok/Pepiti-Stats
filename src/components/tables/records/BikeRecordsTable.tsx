"use client"

import BikeTicTac from "~/components/pills/BikeTicTac"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  worldBikes: any
}

export default function BikeRecordsTable({ worldBikes, ...rest }: Props) {
  console.log(worldBikes.bikes)

  const data = worldBikes.bikes.map((bike) => ({
    _id: bike.name + bike.laps,
    name: bike.name,
    laps: bike.laps,
  }))
  console.log("%cBikeRecordsTable", "color: steelblue", { worldBikes: data })

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
  ]

  const sortKeys = ["laps"]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} sortingKeys={sortKeys} {...rest} />
    </div>
  )
}
