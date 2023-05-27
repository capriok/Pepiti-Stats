"use client"

import Link from "next/link"
import Table, { TableOptions } from "../Table"
import RiderLink from "../RiderLink"

interface Props extends TableOptions {
  worldContacts: any
  seeMore?: boolean
}

export default function ContactRecordsTable({ worldContacts, seeMore, ...rest }: Props) {
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
      key: "contact",
      label: "Contacts",
      align: "right",
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table columns={columns} data={worldContacts.riders} {...rest} />
      {seeMore && (
        <Link href="/top/sr" className="link pt-2 text-sm text-primary no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
