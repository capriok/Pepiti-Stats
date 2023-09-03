import RiderLink from "~/components/RiderLink"
import { renderBannedBy } from "../../../app/blacklists/components/BlacklistTable"
import Pill from "~/components/pills/Pill"

export const mxbBlacklistData = (blacklist) =>
  blacklist.map((rider) => ({
    ...rider,
    guid: rider._id,
  }))

export const mxbBlacklistColumnsWithControls = [
  {
    key: "guid",
    label: "GUID",
    onFilter: (value, row) => row.guid.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "name",
    label: "Name",
    width: "w-full",
    render: (name, row) => name && <RiderLink href={`/profile/${row._id}`} name={name} />,
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "banned_by",
    label: "Reason",
    render: (reason) =>
      reason && (
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
