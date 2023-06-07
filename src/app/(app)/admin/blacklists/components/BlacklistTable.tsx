"use client"

import { useSearchParams } from "next/navigation"
import Table from "~/components/Table/Table"
import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import BlacklistRiderStatsRow from "../../../../../components/tables/expandable/AdminRiderSafetyStats"

interface Props {
  blacklist: any
  isAdministrating: boolean
}

export default function BlacklistTable({ blacklist, isAdministrating }: Props) {
  const searchParams = useSearchParams()
  const guidParam = searchParams.get("guid")

  const data = blacklist.map((rider) => ({
    ...rider,
    guid: rider._id,
  }))
  const columns = [
    {
      key: "guid",
      label: "GUID",
    },
    {
      key: "name",
      label: "Name",
      width: "w-full",
      render: (name, row) => <RiderLink href={`/profile/${row._id}`} name={name} />,
    },
    {
      key: "banned_by",
      label: "Reason",
      render: (reason) => (
        <Pill
          text={reason.charAt(0).toUpperCase() + reason.slice(1)}
          color={renderBannedBy(reason)}
        />
      ),
    },
  ]

  const sortKeys = ["name", "banned_by"]

  return (
    <Table
      data={data}
      columns={columns}
      searchKey="guid"
      searchEnabled={true}
      searchTerm={guidParam ?? ""}
      rankEnabled={false}
      paginationEnabled={true}
      sortingEnabled={true}
      sortingKeys={sortKeys}
      expandable={{
        render: (row) => <BlacklistRiderStatsRow row={row} isAdministrating={isAdministrating} />,
      }}
    />
  )
}

const renderBannedBy = (reason) => {
  switch (reason.toLowerCase()) {
    case "global":
    case "perma":
    case "racism":
    case "racist":
      return "red"
    case "sr":
      return "orange"
    default:
      return "secondary"
  }
}
