'use client'

import Link from 'next/link'
import RiderLink from '../RiderLink'
import Table from '../Table'

interface Props {
  worldMMR: any
  seeMore?: boolean
}

export default function TopMMR({ worldMMR, seeMore }: Props) {
  const columns = [
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => (
        <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0}>
          {name}
        </RiderLink>
      ),
    },
    {
      key: 'MMR',
      label: 'Score',
      align: 'right',
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table columns={columns} data={worldMMR.riders} />
      {seeMore && (
        <Link href="/dashboard/top/mmr" className="text-sm text-primary link no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
