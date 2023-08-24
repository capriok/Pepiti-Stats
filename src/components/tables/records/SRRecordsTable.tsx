"use client"

import RiderLink from "~/components/RiderLink"
import Table, { TableColumn, TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  worldSR: any
  additionalColumns?: TableColumn[]
}

export default function SRRecordsTable({ worldSR, additionalColumns = [], ...rest }: Props) {
  const data: any = worldSR.riders.map((r) => {
    const laps = Object.keys(r.bikes).reduce((acc, curr) => acc + r.bikes[curr].laps, 0)
    return {
      _id: r._id,
      name: r.name,
      rating: r.SR,
      ratio: Math.ceil((r.contact / laps) * 100) / 100,
    }
  })
  // console.log("%cSRRecordsTable", "color: steelblue", { worldSR: data })

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
    ...additionalColumns,
  ]

  const sortKeys = ["rating", "ratio"]

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
