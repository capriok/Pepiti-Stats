"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useUserContext } from "~/providers/UserProvider"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import UnbanRiderButton from "../actions/UnbanRiderButton"
import Table from "~/ui/Table"
import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import RiderSafetyStatsRow from "./expandable/RiderSafetyStatsRow"
import { MoreHorizontal } from "lucide-react"

interface Props {
  blacklist: any
}

export default function BlacklistTable({ blacklist }: Props) {
  const user = useUserContext()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const guidParam = searchParams.get("guid")
  const isAdministrating = pathname.includes("admin") && user.isAdmin

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

  const adminAction = {
    key: "guid",
    label: "Action",
    align: "right",
    render: (guid, row) => (
      <Popover>
        <PopoverTrigger>
          <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col items-center justify-center gap-4">
          <UnbanRiderButton riderId={guid} name={row.name} />
        </PopoverContent>
      </Popover>
    ),
  }

  if (isAdministrating) columns.push(adminAction as any)

  const sortKeys = ["name", "banned_by"]

  return (
    <Table
      data={data}
      columns={columns}
      searchEnabled={true}
      searchKey="guid"
      searchTerm={guidParam ?? ""}
      rankEnabled={false}
      paginationEnabled={true}
      sortingKeys={sortKeys}
      expandable={{
        render: (row) => <RiderSafetyStatsRow row={row} />,
      }}
    />
  )
}

export const renderBannedBy = (reason) => {
  switch (reason.toLowerCase()) {
    case "global":
    case "perma":
    case "racism":
    case "racist":
      return "red"
    case "sr":
      return "orange"
    default:
      return "primary"
  }
}
