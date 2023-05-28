"use client"

import Link from "next/link"
import RiderLink from "../RiderLink"
import Table, { TableOptions } from "../Table"

interface Props extends TableOptions {
  worldSR: any
  seeMore?: boolean
}

export default function SRRecordsTable({ worldSR, seeMore, ...rest }: Props) {
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
      key: "SR",
      label: "Score",
      align: "right",
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table columns={columns} data={worldSR.riders} {...rest} />
      {seeMore && (
        <Link href="/top/sr" className="link pt-2 text-sm text-primary no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
