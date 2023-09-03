import RiderLink from "~/components/RiderLink"
import { TableColumn } from "~/ui/Table"

export const recordHoldersData = (records) =>
  Object.keys(records).map((guid) => ({
    _id: records[guid]._id,
    name: records[guid].name,
    records: records[guid].total,
  }))

export const recordHoldersColumns = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => {
      return <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    },
  },
  {
    key: "records",
    label: "Records",
    align: "right",
  },
]
export const recordHoldersColumnsWithControls = recordHoldersColumns.map((c) => {
  let col = { ...c } as TableColumn

  if (col.key === "name") {
    col = {
      ...col,
      onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
    }
  }

  return col
})
