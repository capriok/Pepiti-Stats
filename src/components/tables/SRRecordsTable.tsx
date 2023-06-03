"use client"

import RiderLink from "../RiderLink"
import Table, { TableOptions } from "../Table/Table"

interface Props extends TableOptions {
  worldSR: any
}

export default function SRRecordsTable({ worldSR, ...rest }: Props) {
  const data: any = worldSR.riders.map((r) => ({
    _id: r._id,
    name: r.name,
    score: r.SR,
  }))
  console.log("%cSRRecordsTable", "color: steelblue", { worldSR: data })

  const columns = [
    {
      key: "name",
      label: "Rider",
      render: (name, row) => (
        <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0}>
          {name}
        </RiderLink>
      ),
    },
    {
      key: "score",
      label: "Score",
      align: "right",
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table
        data={data}
        columns={columns}
        paginationEnabled={true}
        jumpToEnabled={false}
        sortingKeys={["score"]}
        {...rest}
      />
    </div>
  )
}
