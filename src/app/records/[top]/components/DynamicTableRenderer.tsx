"use client"

import { useEffect, useState } from "react"
import useSwr from "swr"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import WorldRecordsTable from "~/components/tables/records/WorldRecordsTable"
import RiderWorldRecordsTableRow from "~/components/tables/expandable/RiderWorldRecordsTableRow"
import MMRRecordsTable from "~/components/tables/records/MMRRecordsTable"
import RiderRecentRacesTableRow from "~/components/tables/expandable/RiderRecentRacesTableRow"
import SRRecordsTable from "~/components/tables/records/SRRecordsTable"
import RiderSafetyStatsRow from "~/components/tables/expandable/RiderSafetyStatsRow"
import BikeRecordsTable from "~/components/tables/records/BikeRecordsTable"
import ContactRecordsTable, {
  handleHPLColor,
} from "~/components/tables/records/ContactRecordsTable"

export default function DynamicTableRenderer({ top, records }) {
  return dynamicDataMap[top].render(records)
}

const tableProps = {
  defaultPageSize: 20,
  searchEnabled: true,
  pageSizeEnabled: true,
  sortingEnabled: true,
  paginationEnabled: true,
}

const dynamicDataMap = {
  riders: {
    render: (records) => {
      return (
        <WorldRecordsTable
          worldRecords={records}
          sortingKeys={["records"]}
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
          sortingKeys={["rating"]}
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
          sortingKeys={["rating", "ratio"]}
          expandable={{
            render: (row) => <RiderSafetyStatsRow row={row} />,
          }}
          additionalColumns={[
            {
              key: "ratio",
              label: "Hits per lap",
              render: (ratio) => <Pill color={handleHPLColor(ratio)} text={ratio.toFixed(2)} />,
            },
          ]}
          {...tableProps}
        />
      )
    },
  },
  contacts: {
    render: (records) => {
      return (
        <ContactRecordsTable
          worldContacts={records}
          sortingKeys={["contacts", "ratio"]}
          additionalColumns={[
            {
              key: "ratio",
              label: "Hits per lap",
              render: (ratio) => <Pill color={handleHPLColor(ratio)} text={ratio.toFixed(2)} />,
            },
          ]}
          {...tableProps}
        />
      )
    },
  },
  bikes: {
    render: (records) => {
      const Content = () => {
        const { data: apiData, isLoading } = useSwr("/summary")
        const [laps, setLaps] = useState(0)

        useEffect(() => {
          if (apiData) setLaps(apiData.laps)
        }, [isLoading])

        return (
          <>
            <div className="mb-4 flex justify-end gap-2">
              <div className="text-accent">Total Laps</div>
              {laps ? (
                <Pill text={laps.toLocaleString()} color="primary" />
              ) : (
                <div className="min-h-[28px]">
                  <Spinner />
                </div>
              )}
            </div>
            <BikeRecordsTable worldBikes={records} totalLaps={laps} {...tableProps} />
          </>
        )
      }

      return <Content />
    },
  },
}
