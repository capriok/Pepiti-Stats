"use client"

import WorldRecordsTable from "~/components/tables/WorldRecordsTable"
import WorldRecordsRiderRecordsRow from "~/components/tables/expandable/WorldRecordsRiderRecordsRow"
import MMRRecordsTable from "~/components/tables/MMRRecordsTable"
import MMRRecordsRiderRacesRow from "~/components/tables/expandable/MMRRecordsRiderRacesRow"
import SRRecordsTable from "~/components/tables/SRRecordsTable"
import BikeRecordsTable from "~/components/tables/BikeRecordsTable"
import ContactRecordsTable from "~/components/tables/ContactRecordsTable"
import SRRecordsRiderRacesRow from "~/components/tables/expandable/SRRecordsRiderRacesRow"

export default function DynamicTableRenderer({ top, records }) {
  return dynamicDataMap[top].render(records)
}

const tableProps = {
  defaultPageSize: 25,
  searchEnabled: true,
  paginationEnabled: true,
  jumpToEnabled: true,
  sortingEnabled: true,
}

const dynamicDataMap = {
  riders: {
    render: (records) => {
      return (
        <WorldRecordsTable
          worldRecords={records}
          expandable={{
            render: (row) => <WorldRecordsRiderRecordsRow row={row} />,
          }}
          {...tableProps}
        />
      )
    },
  },
  mmr: {
    render: (records) => {
      return (
        <MMRRecordsTable
          worldMMR={records}
          expandable={{
            render: (row) => <MMRRecordsRiderRacesRow row={row} />,
          }}
          {...tableProps}
        />
      )
    },
  },
  sr: {
    render: (records) => {
      return (
        <SRRecordsTable
          worldSR={records}
          expandable={{
            render: (row) => <SRRecordsRiderRacesRow row={row} />,
          }}
          {...tableProps}
        />
      )
    },
  },
  bikes: {
    render: (records) => {
      return <BikeRecordsTable worldBikes={records} {...tableProps} />
    },
  },
  contacts: {
    render: (records) => {
      return <ContactRecordsTable worldContacts={records} {...tableProps} />
    },
  },
}
