'use client'

import Link from 'next/link'
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
      render: (name, row) => <Link href={`/profile/${row._id}`}>{name}</Link>,
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
