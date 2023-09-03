import RiderLink from "~/components/RiderLink"

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

export const recordHoldersColumnsWithControls = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => {
      return <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    },
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "records",
    label: "Records",
    align: "right",
  },
]
