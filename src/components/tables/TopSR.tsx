'use client'

import Link from 'next/link'
import Table from '../Table'

interface Props {
  worldSR: any
  seeMore?: boolean
}

export default function TopSR({ worldSR, seeMore }: Props) {
  const columns = [
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => <Link href={`/profile/${row._id}`}>{name}</Link>,
    },
    {
      key: 'SR',
      label: 'Score',
      align: 'right',
    },
  ]

  return (
    <div className="flex flex-col items-end">
      <Table columns={columns} data={worldSR.riders} />
      {seeMore && (
        <Link href="/dashboard/top/sr" className="text-sm text-primary link no-underline">
          See More
        </Link>
      )}
    </div>
  )
}
