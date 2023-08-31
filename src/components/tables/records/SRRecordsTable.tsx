"use client"

import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import Table, { TableColumn, TableOptions } from "~/ui/Table"
import { handleHPLColor } from "./ContactRecordsTable"

interface Props extends TableOptions {
  riders: any
  columns: any
}

export default function SRRecordsTable({ riders, columns, ...rest }: Props) {
  const data: any = riders.map((r) => {
    const laps = Object.keys(r.bikes).reduce((acc, curr) => acc + r.bikes[curr].laps, 0)
    return {
      _id: r._id,
      name: r.name,
      rating: r.SR,
      ratio: Math.ceil((r.contact / laps) * 100) / 100,
    }
  })
  // console.log("%cSRRecordsTable", "color: steelblue", { riders: data })

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} {...rest} />
    </div>
  )
}

export const srRecordsColumns = [
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

export const srRecordsColumnsWithRatio = [
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
  {
    key: "ratio",
    label: "Hits per lap",
    render: (ratio) => <Pill color={handleHPLColor(ratio)} text={ratio.toFixed(2)} />,
  },
]
