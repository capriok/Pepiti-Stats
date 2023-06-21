"use client"

import RiderLink from "~/components/RiderLink"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  worldSR: any
}

export default function SRRecordsTable({ worldSR, ...rest }: Props) {
  const data: any = worldSR.riders.map((r) => ({
    _id: r._id,
    name: r.name,
    rating: r.SR,
  }))
  console.log("%cSRRecordsTable", "color: steelblue", { worldSR: data })

  const columns = [
    {
      key: "name",
      label: "Rider",
      render: (name, row) => (
        <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
      ),
    },
    {
      key: "rating",
      label: "Rating",
      align: "right",
    },
  ]

  const sortKeys = ["rating"]

  return (
    <div className="flex flex-col items-end">
      <Table
        data={data}
        columns={columns}
        paginationEnabled={true}
        jumpToEnabled={false}
        sortingKeys={sortKeys}
        {...rest}
      />
    </div>
  )
}
