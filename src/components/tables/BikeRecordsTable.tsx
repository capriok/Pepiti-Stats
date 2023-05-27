"use client"

import Link from "next/link"
import Table, { TableOptions } from "../Table"

interface Props extends TableOptions {
  worldBikes: any
  seeMore?: boolean
}

export default function BikeRecordsTable({ worldBikes, seeMore, ...rest }: Props) {
  const data = worldBikes.bikes.map((bike) => ({
    _id: bike.name + bike.laps,
    ...bike,
  }))
  const columns = [
    {
      key: "name",
      label: "Rider",
    },
    {
      key: "laps",
      label: "Laps",
      align: "right",
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table columns={columns} data={data} {...rest} />
      {seeMore && (
        <Link href="/top/sr" className="link pt-2 text-sm text-primary no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
