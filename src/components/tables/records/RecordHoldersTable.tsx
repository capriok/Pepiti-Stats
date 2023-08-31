"use client"

import RiderLink from "~/components/RiderLink"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  riders: any
  columns: any
}

export default function RecordHoldersTable({ riders, columns, ...rest }: Props) {
  const data: any = Object.keys(riders).map((guid) => ({
    _id: riders[guid]._id,
    name: riders[guid].name,
    records: riders[guid].total,
  }))
  // console.log("%cWorldRecordsTable", "color: steelblue", { worldRecords: data })

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} {...rest} />
    </div>
  )
}

export const recordHoldersColumns = [
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

export const recordHoldersColumnWithFilters = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => {
      return <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    },
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "records",
    label: "Records",
    align: "right",
  },
]
