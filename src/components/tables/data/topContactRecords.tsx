import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import { TableColumn } from "~/ui/Table"

export const contactRecordsData = (records) =>
  records.riders.map((r) => {
    const laps = Object.keys(r.bikes).reduce((acc, curr) => acc + r.bikes[curr].laps, 0)
    return {
      _id: r._id,
      name: r.name,
      contacts: r.contact,
      laps: laps,
      ratio: Math.ceil((r.contact / laps) * 100) / 100,
    }
  })

export const contactRecordsColumns = [
  {
    key: "name",
    label: "Rider",
    render: (name, row) => (
      <RiderLink href={`/profile/${row._id}`} donator={row.donation > 0} name={name} />
    ),
  },
  {
    key: "contacts",
    label: "Contacts",
    align: "right",
  },
]

export const contactRecordsColumnsWithRatio = contactRecordsColumns
  .map((c) => {
    let col = { ...c } as TableColumn

    if (col.key === "name") {
      col = {
        ...col,
        onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
      }
    }

    return col
  })
  .concat([
    {
      key: "ratio",
      label: "Hits per lap",
      render: (ratio) => <Pill color={handleHPLColor(ratio)} text={ratio.toFixed(2)} />,
    },
  ])

export function handleHPLColor(n: number) {
  if (n < 0) return ""
  if (n >= 0.9) {
    return "red"
  } else if (n >= 0.7) {
    return "orange"
  } else if (n >= 0.5) {
    return "info"
  } else {
    return "primary"
  }
}
