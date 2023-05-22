'use client'

import Link from 'next/link'
import RiderLink from '../RiderLink'
import Table, { TableOptions } from '../Table'

interface Props extends TableOptions {
  worldRecords: any
  seeMore?: boolean
}

export default function WorldRecordsTable({ worldRecords, seeMore, ...rest }: Props) {
  const data: any = Object.keys(worldRecords.riders).map((rk) => ({
    ...worldRecords.riders[rk],
  }))

  const columns = [
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => {
        return (
          <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0}>
            {name}
          </RiderLink>
        )
      },
    },
    {
      key: 'total',
      label: 'Records',
      align: 'right',
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table columns={columns} data={data} {...rest} />
      {seeMore && (
        <Link href="/top/riders" className="link pt-2 text-sm text-primary no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
