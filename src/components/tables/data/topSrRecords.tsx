import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import { handleHPLColor } from "./topContactRecords"
import { TableColumn } from "~/ui/Table"

export const srRecordsData = (records) =>
  records.map((r) => {
    const laps = Object.keys(r.bikes).reduce((acc, curr) => acc + r.bikes[curr].laps, 0)
    return {
      _id: r._id,
      name: r.name,
      rating: r.SR,
      ratio: Math.ceil((r.contact / laps) * 100) / 100,
    }
  })

export const srRecordsColumns = [
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

export const srRecordsColumnsWithControls = srRecordsColumns
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
