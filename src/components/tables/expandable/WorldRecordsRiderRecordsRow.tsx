"use client"

import Link from "next/link"
import useSWR from "swr"
import { fetcher } from "~/api/fetcher"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import Table from "~/components/Table/Table"
import { dateIsValid } from "~/utils/dateIsValid"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"

const categories = [
  "MX1 OEM",
  "MX1-2T OEM",
  "MX2 OEM",
  "MX2-2T OEM",
  "SM1 OEM",
  "SM1-2T OEM",
  "SM2 OEM",
  "SM2-2T OEM",
  "MX3 OEM",
]

export default function WorldRecordsRiderRecordsRow({ row }) {
  const { data: riderData, isLoading } = useSWR(`/rider/${row._id}`, fetcher)

  if (isLoading)
    return (
      <div className="py-4">
        <Spinner />
      </div>
    )
  const worldRecords = riderData.world_records
  const data = [worldRecords]
  console.log("%cWorldRecordsRiderRecordsRow", "color: goldenrod", { records: data })

  const columns = [
    {
      key: "MX1 OEM",
      label: "MX1 OEM",
    },
    {
      key: "MX1-2T OEM",
      label: "MX1-2T OEM",
    },
    {
      key: "MX2 OEM",
      label: "MX2 OEM",
    },
    {
      key: "MX2-2T OEM",
      label: "MX2-2T OEM",
    },
    {
      key: "total",
      label: "Total",
      render: (total) => <div className="text-lg font-semibold text-secondary">{total}</div>,
    },
  ]

  return (
    <>
      <div className="mb-2 font-semibold">{row.name}&apos;s World Records</div>
      <Table data={data} columns={columns} searchKey="track" rankEnabled={false} />
    </>
  )
}
