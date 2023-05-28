"use client"

import Table from "~/components/Table"

const categories = [
  "MX1 OEM",
  "MX1-2T OEM",
  "MX2 OEM",
  "MX2-2T OEM",
  "SM1 OEM",
  "SM1-2t OEM",
  "SM2 OEM",
  "SM2-2t OEM",
  "MX3 OEM",
]

interface Props {
  worldRecords: RiderWorldRecords
}

export default function RiderWorldRecordsTable({ worldRecords }: Props) {
  const riderWRCategories = Object.keys(worldRecords).filter((c) => categories.includes(c))

  const data = riderWRCategories
    .map((category, i) => ({
      _id: i + category + worldRecords[category],
      category: category,
      records: worldRecords[category],
    }))
    .sort((a, b) => b.records - a.records)

  const columns = [
    {
      key: "category",
      label: "Category",
    },
    {
      key: "records",
      label: "Records",
      render: (records) => <div className="my-2">{records}</div>,
    },
  ]

  return (
    <div className="flex w-full flex-col items-start p-4 pt-0">
      <div className="my-4 flex gap-2 text-lg font-semibold">
        <div>Total World Records:</div>
        <div>{worldRecords.total}</div>
      </div>
      <Table data={data} columns={columns} rankEnabled={false} />
    </div>
  )
}
