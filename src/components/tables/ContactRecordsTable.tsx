"use client"

import Table, { TableOptions } from "../Table/Table"
import RiderLink from "../RiderLink"

interface Props extends TableOptions {
  worldContacts: any
}

export default function ContactRecordsTable({ worldContacts, ...rest }: Props) {
  const data: any = worldContacts.riders.map((r) => ({
    _id: r._id,
    name: r.name,
    score: r.contact,
  }))
  console.log("%cContactRecordsTable", "color: steelblue", { records: data })

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
      label: "Contacts",
      align: "right",
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} {...rest} />
    </div>
  )
}
