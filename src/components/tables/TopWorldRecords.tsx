'use client'

import Link from 'next/link'
import RiderLink from '../RiderLink'
import Table from '../Table'

interface Props {
  worldRecords: any
  seeMore?: boolean
}

export default function TopWorldRecords({ worldRecords, seeMore }: Props) {
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
      <Table columns={columns} data={data} />
      {seeMore && (
        <Link href="/dashboard/top/riders" className="text-sm text-primary link no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
