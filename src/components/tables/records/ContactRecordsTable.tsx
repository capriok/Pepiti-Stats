"use client"

import Pill from "~/components/pills/Pill"
import RiderLink from "~/components/RiderLink"
import Table, { TableOptions } from "~/ui/Table"

interface Props extends TableOptions {
  worldContacts: any
}

export default function ContactRecordsTable({ worldContacts, ...rest }: Props) {
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
    {
      key: "ratio",
      label: "Hits per lap",
      render: (ratio) => <Pill color={handleHPLColor(ratio)} text={ratio} />,
    },
  ]

  const sortKeys = ["contacts", "ratio"]

  return (
    <div className="flex flex-col items-end">
      <Table data={data} columns={columns} sortingKeys={sortKeys} {...rest} />
    </div>
  )
}

function handleHPLColor(n: number) {
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
