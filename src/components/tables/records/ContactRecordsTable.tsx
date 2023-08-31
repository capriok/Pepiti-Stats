"use client"

import Table, { TableColumn, TableOptions } from "~/ui/Table"
import RiderLink from "~/components/RiderLink"

interface Props extends TableOptions {
  worldContacts: any
  additionalColumns?: TableColumn[]
}

export default function ContactRecordsTable({
  worldContacts,
  additionalColumns = [],
  ...rest
}: Props) {
  const data: any = worldContacts.riders.map((r) => {
    const laps = Object.keys(r.bikes).reduce((acc, curr) => acc + r.bikes[curr].laps, 0)
    return {
      _id: r._id,
      name: r.name,
      contacts: r.contact,
      laps: laps,
      ratio: Math.ceil((r.contact / laps) * 100) / 100,
    }
  })
  // console.log("%cContactRecordsTable", "color: steelblue", { worldContacts: data })

  const columns = [
    {
      key: "name",
      label: "Rider",
      render: (name, row) => (
        <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
      ),
    },
    {
      key: "contacts",
      label: "Contacts",
      align: "right",
    },

    ...additionalColumns,
  ]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} {...rest} />
    </div>
  )
}

export function handleHPLColor(n: number) {
  if (n < 0) return ""
  if (n >= 0.9) {
    return "red"
  } else if (n >= 0.7) {
    return "orange"
  } else if (n >= 0.5) {
    return "info"
  } else {
    return "primary"
  }
}
