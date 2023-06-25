"use client"

import WorldRecordsTable from "~/components/tables/records/WorldRecordsTable"
import RiderWorldRecordsTableRow from "~/components/tables/expandable/RiderWorldRecordsTableRow"
import MMRRecordsTable from "~/components/tables/records/MMRRecordsTable"
import RiderRecentRacesTableRow from "~/components/tables/expandable/RiderRecentRacesTableRow"
import SRRecordsTable from "~/components/tables/records/SRRecordsTable"
import RiderSafetyStatsRow from "~/components/tables/expandable/RiderSafetyStatsRow"
import BikeRecordsTable from "~/components/tables/records/BikeRecordsTable"
import ContactRecordsTable from "~/components/tables/records/ContactRecordsTable"

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
            render: (row) => <RiderWorldRecordsTableRow row={row} />,
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
            render: (row) => <RiderRecentRacesTableRow row={row} />,
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
            render: (row) => <RiderSafetyStatsRow row={row} />,
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
