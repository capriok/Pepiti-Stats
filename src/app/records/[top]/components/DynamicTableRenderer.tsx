"use client"

import { useEffect, useState } from "react"
import useSwr from "swr"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import RecordHoldersTable, {
  recordHoldersColumnWithFilters,
} from "~/components/tables/records/RecordHoldersTable"
import RiderWorldRecordsTableRow from "~/components/tables/expandable/RiderWorldRecordsTableRow"
import MMRRecordsTable, { mmrRecordsColumns } from "~/components/tables/records/MMRRecordsTable"
import RiderRecentRacesTableRow from "~/components/tables/expandable/RiderRecentRacesTableRow"
import SRRecordsTable, {
  srRecordsColumnsWithRatio,
} from "~/components/tables/records/SRRecordsTable"
import RiderSafetyStatsRow from "~/components/tables/expandable/RiderSafetyStatsRow"
import BikeRecordsTable, { bikeRecordsColumns } from "~/components/tables/records/BikeRecordsTable"
import ContactRecordsTable, {
  contactRecordsColumnsWithRatio,
  handleHPLColor,
} from "~/components/tables/records/ContactRecordsTable"

export default function DynamicTableRenderer({ top, records }) {
  return dynamicDataMap[top].render(records)
}

const tableProps = {
  defaultPageSize: 20,
  pageSizeEnabled: true,
  sortingEnabled: true,
  paginationEnabled: true,
}

const dynamicDataMap = {
  riders: {
    render: (records) => {
      return (
        <RecordHoldersTable
          riders={records.riders}
          columns={recordHoldersColumnWithFilters}
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
          riders={records.riders}
          columns={mmrRecordsColumns}
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
          riders={records.riders}
          columns={srRecordsColumnsWithRatio}
          sortingKeys={["rating", "ratio"]}
          expandable={{
            render: (row) => <RiderSafetyStatsRow row={row} />,
          }}
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
          columns={contactRecordsColumnsWithRatio}
          sortingKeys={["contacts", "ratio"]}
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
            <BikeRecordsTable
              bikes={records.bikes}
              columns={bikeRecordsColumns}
              totalLaps={laps}
              {...tableProps}
            />
          </>
        )
      }

      return <Content />
    },
  },
}
