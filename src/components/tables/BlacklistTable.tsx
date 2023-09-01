"use client"

import { usePathname } from "next/navigation"
import { useUserContext } from "~/providers/UserProvider"
import Table from "~/ui/Table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/ui/Dropdown"
import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import RiderSafetyStatsRow from "./expandable/RiderSafetyStatsRow"
import UnbanRiderDialog from "../dialogs/UnbanRiderDialog"

import { MoreHorizontal } from "lucide-react"

interface Props {
  blacklist: any
}

export default function BlacklistTable({ blacklist }: Props) {
  const user = useUserContext()
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && user.isAdmin

  const data = blacklist.map((rider) => ({
    ...rider,
    guid: rider._id,
  }))
  const columns = [
    {
      key: "guid",
      label: "GUID",
      onFilter: (value, row) => row.guid.toLowerCase().includes(value.toLowerCase()),
    },
    {
      key: "name",
      label: "Name",
      width: "w-full",
      render: (name, row) => <RiderLink href={`/profile/${row._id}`} name={name} />,
      onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
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
      filters: [
        { key: "Global", value: "Global" },
        { key: "Admin", value: "Admin" },
      ],
      onFilter: (value, row) =>
        value === "Global" ? row.banned_by === "Global" : row.banned_by !== "Global",
    },
  ]

  const adminAction = {
    key: "guid",
    label: "Action",
    align: "right",
    render: (guid, row) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Administration</DropdownMenuLabel>
          <div className="p-2 text-sm hover:bg-neutral-800/80">
            <UnbanRiderDialog guid={guid} name={row.name} reason={row.banned_by} />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }

  if (isAdministrating) columns.push(adminAction as any)

  const sortKeys = ["name", "banned_by"]

  return (
    <Table
      data={data}
      columns={columns}
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
    case "sr":
      return "orange"

    case "global":
      return "red"

    default:
      return "info"
  }
}
