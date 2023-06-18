"use client"

import RiderLink from "~/components/RiderLink"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  worldContacts: any
}

export default function ContactRecordsTable({ worldContacts, ...rest }: Props) {
  const data: any = worldContacts.riders.map((r) => ({
    _id: r._id,
    name: r.name,
    contacts: r.contact,
  }))
  console.log("%cContactRecordsTable", "color: steelblue", { worldContacts: data })

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
  ]

  const sortKeys = ["contacts"]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} sortingKeys={sortKeys} {...rest} />
    </div>
  )
}