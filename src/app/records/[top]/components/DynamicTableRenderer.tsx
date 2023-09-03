"use client"

import { useEffect, useState } from "react"
import useSwr from "swr"
import useSWRMutation from "swr/mutation"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import Table, { TableOptions } from "~/ui/Table"
import {
  recordHoldersData,
  recordHoldersColumnsWithControls,
} from "~/components/tables/data/topRecordsHolders"
import {
  mmrRecordsColumnsWithControls,
  mmrRecordsData,
} from "~/components/tables/data/topMmrRecords"
import { srRecordsColumnsWithControls, srRecordsData } from "~/components/tables/data/topSrRecords"
import {
  contactRecordsColumnsWithRatio,
  contactRecordsData,
} from "~/components/tables/data/topContactRecords"
import {
  bikeRecordsColumnsWithControls,
  bikeRecordsData,
} from "~/components/tables/data/topBikeRecords"
import RiderWorldRecordsTableRow from "~/components/tables/expandable/RiderWorldRecordsTableRow"
import RiderRecentRacesTableRow from "~/components/tables/expandable/RiderRecentRacesTableRow"
import RiderSafetyStatsRow from "~/components/tables/expandable/RiderSafetyStatsRow"
import { fetcher } from "~/api/fetcher"

const PAGE_SIZE = 20
const LIMIT = 100

export default function DynamicTableRenderer({ top, records }) {
  const [limit, setLimit] = useState(LIMIT)

  const tableProps: TableOptions = {
    defaultPageSize: PAGE_SIZE,
    defaultDataCap: limit,
    pageSizeEnabled: true,
    paginationEnabled: true,
    dataCapEnabled: true,
    onDataCapChange: setLimit,
  }

  const { data: topRecords, trigger, isMutating } = useSWRMutation(`/top/${top}/${limit}`, fetcher)

  useEffect(() => {
    if (limit === LIMIT) return
    trigger()
  }, [limit])

  const dynamicDataMap = {
    riders: {
      render: (records) => {
        return (
          <Table
            data={recordHoldersData(records.riders)}
            columns={recordHoldersColumnsWithControls}
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
          <Table
            data={mmrRecordsData(records.riders)}
            columns={mmrRecordsColumnsWithControls}
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
          <Table
            data={srRecordsData(records.riders)}
            columns={srRecordsColumnsWithControls}
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
          <Table
            data={contactRecordsData(records)}
            columns={contactRecordsColumnsWithRatio}
            sortingKeys={["contacts", "ratio"]}
            expandable={{
              render: (row) => <RiderWorldRecordsTableRow row={row} />,
            }}
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
              <Table
                data={bikeRecordsData(records.bikes, laps)}
                columns={bikeRecordsColumnsWithControls}
                {...tableProps}
              />
            </>
          )
        }

        return <Content />
      },
    },
  }

  if (isMutating) return <Spinner />

  if (!topRecords || isMutating) return dynamicDataMap[top].render(records)

  return dynamicDataMap[top].render(topRecords)
}
