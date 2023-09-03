import RiderLink from "~/components/RiderLink"

export const mmrRecordsData = (records) =>
  records.map((r) => ({
    _id: r._id,
    name: r.name,
    rating: r.MMR,
  }))

export const mmrRecordsColumns = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => (
      <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    ),
  },
  {
    key: "rating",
    label: "Rating",
    align: "right",
  },
]

export const mmrRecordsColumnsWithControls = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => (
      <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    ),
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "rating",
    label: "Rating",
    align: "right",
  },
]
