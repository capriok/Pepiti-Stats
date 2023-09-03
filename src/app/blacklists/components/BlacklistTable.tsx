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
import RiderSafetyStatsRow from "../../../components/tables/expandable/RiderSafetyStatsRow"
import UnbanRiderDialog from "../../../components/dialogs/UnbanRiderDialog"
import {
  mxbBlacklistColumnsWithControls,
  mxbBlacklistData,
} from "../../../components/tables/data/mxbBlacklist"
import { MoreHorizontal } from "lucide-react"

interface Props {
  blacklist: any
}

export default function BlacklistTable({ blacklist }: Props) {
  const user = useUserContext()
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && user.isAdmin

  const adminAction = {
    key: "guid",
    label: "Action",
    align: "right",
    render: (guid, row) =>
      row.banned_by !== "Global" ? (
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
      ) : (
        <></>
      ),
  }

  if (isAdministrating) mxbBlacklistColumnsWithControls.push(adminAction as any)

  const sortKeys = ["name", "banned_by"]

  return (
    <Table
      data={mxbBlacklistData(blacklist)}
      columns={mxbBlacklistColumnsWithControls}
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
