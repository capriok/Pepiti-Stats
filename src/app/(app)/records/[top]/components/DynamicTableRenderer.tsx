"use client"

import WorldRecordsTable from "~/components/tables/WorldRecordsTable"
import RiderWorldRecordsStats from "~/components/tables/expandable/RiderWorldRecordsStats"
import MMRRecordsTable from "~/components/tables/MMRRecordsTable"
import RiderRecentRacesTable from "~/components/tables/expandable/RiderRecentRacesTable"
import SRRecordsTable from "~/components/tables/SRRecordsTable"
import RiderSafetyStats from "~/components/tables/expandable/RiderSafetyStats"
import BikeRecordsTable from "~/components/tables/BikeRecordsTable"
import ContactRecordsTable from "~/components/tables/ContactRecordsTable"

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
            render: (row) => <RiderWorldRecordsStats row={row} />,
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
            render: (row) => <RiderRecentRacesTable row={row} />,
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
            render: (row) => <RiderSafetyStats row={row} />,
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