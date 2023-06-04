"use client"

import RiderLink from "../RiderLink"
import Table, { TableOptions } from "../Table/Table"

interface Props extends TableOptions {
  worldMMR: any
}

export default function MMRRecordsTable({ worldMMR, ...rest }: Props) {
  const data: any = worldMMR.riders.map((r) => ({
    _id: r._id,
    name: r.name,
    score: r.MMR,
  }))
  console.log("%cMMRRecordsTable", "color: steelblue", { worldMMR: data })

  const columns = [
    {
      key: "name",
      label: "Rider",
      render: (name, row) => (
        <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
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
