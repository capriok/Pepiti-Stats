"use client"

import BikeWithPrefixColor from "../pills/BikeWithPrefixColor"
import Table, { TableOptions } from "../Table/Table"

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
      render: (name) => <BikeWithPrefixColor bike={name} />,
    },
    {
      key: "laps",
      label: "Laps",
      align: "right",
      render: (laps) => (laps ? laps.toLocaleString() : "-"),
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} sortingKeys={["laps"]} {...rest} />
    </div>
  )
}
