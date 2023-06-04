"use client"

import { useSearchParams } from "next/navigation"
import Table from "~/components/Table/Table"
import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"

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
        render: (row) => <BlacklistRiderRow row={row} isAdministrating={isAdministrating} />,
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

function BlacklistRiderRow({ row, isAdministrating }) {
  const columns: any = []
  const adminColumn = {
    key: "guid",
    label: "Admin",
    width: "w-full",
    render: (guid, row) => <UnbanRiderButton riderId={guid} name={row.name} hackit={true} />,
  }

  if (isAdministrating) columns.push(adminColumn)

  const riderColumns = [
    {
      key: "MMR",
      label: "MMR",
      render: (MMR) => <Pill text={MMR} />,
    },
    {
      key: "SR",
      label: "SR",
      render: (SR) => <Pill text={SR} />,
    },
    {
      key: "contact",
      label: "Contacts",
      render: (contact) => <Pill text={contact} />,
    },
  ]
  columns.push(...riderColumns)

  return <Table data={[row]} columns={columns} rankEnabled={false} />
}
