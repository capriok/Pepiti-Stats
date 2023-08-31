"use client"

import RiderLink from "~/components/RiderLink"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  riders: any
  columns: any
}

export default function MMRRecordsTable({ riders, columns, ...rest }: Props) {
  const data: any = riders.map((r) => ({
    _id: r._id,
    name: r.name,
    rating: r.MMR,
  }))
  // console.log("%cMMRRecordsTable", "color: steelblue", { riders: data })

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} {...rest} />
    </div>
  )
}

export const mmrRecordsColumns = [
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

export const mmrRecordsColumnsWithControls = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => (
      <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    ),
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "rating",
    label: "Rating",
    align: "right",
  },
]
