'use client'

import Table from '~/components/Table'

const categories = [
  'MX1 OEM',
  'MX1-2T OEM',
  'MX2 OEM',
  'MX2-2T OEM',
  'SM1 OEM',
  'SM1-2t OEM',
  'SM2 OEM',
  'SM2-2t OEM',
  'MX3 OEM',
]

interface Props {
  rider: any
}

export const RiderWorldRecordsTable = ({ rider }: Props) => {
  const riderWRCategories = Object.keys(rider.world_records).filter((c) => categories.includes(c))

  const data = riderWRCategories
    .map((category, i) => ({
      _id: i + category + rider.world_records[category],
      category: category,
      records: rider.world_records[category],
    }))
    .sort((a, b) => b.records - a.records)

  const columns = [
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'records',
      label: 'Records',
      render: (records) => <div className="my-2">{records}</div>,
    },
  ]

  return (
    <div className="w-full flex flex-col items-start card card-body p-4 pt-0 bg-base-200">
      <div className="flex gap-2 text-lg my-4 font-semibold">
        <div>Total World Records:</div>
        <div>{rider.world_records.total}</div>
      </div>
      <Table data={data} columns={columns} rankEnabled={false} />
    </div>
  )
}
