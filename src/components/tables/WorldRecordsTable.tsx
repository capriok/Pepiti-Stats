"use client"

import RiderLink from "../RiderLink"
import Table, { TableOptions } from "../Table/Table"

interface Props extends TableOptions {
  worldRecords: any
}

export default function WorldRecordsTable({ worldRecords, ...rest }: Props) {
  const data: any = Object.keys(worldRecords.riders).map((guid) => ({
    _id: worldRecords.riders[guid]._id,
    name: worldRecords.riders[guid].name,
    records: worldRecords.riders[guid].total,
  }))
  console.log("%cWorldRecordsTable", "color: steelblue", { worldRecords: data })

  const columns = [
    {
      key: "name",
      label: "Rider",
      render: (name, row) => {
        return <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
      },
    },
    {
      key: "records",
      label: "Records",
      align: "right",
    },
  ]

  const sortKeys = ["records"]

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
