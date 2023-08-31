"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import cn from "~/utils/cn"
import Table, { TableOptions } from "~/ui/Table"
import { TrackRecordsTable } from "~/components/tables/records/TrackRecordsTable"
import RiderWorldRecordsTableRow from "~/components/tables/expandable/RiderWorldRecordsTableRow"
import GeneralEventAlert from "~/components/alerts/GeneralEventAlert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/ui/Dropdown"
import { Filter, X } from "lucide-react"

import applicationAlerts from "@/data/application-alerts.json"
import Pill from "~/components/pills/Pill"

interface Props {
  trackList: any
  table?: TableOptions
}

const PAGE_SIZE = 20

export default function WorldRecords(props: Props) {
  const { trackList } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const trackParam = searchParams.get("track")
  const filterParam = searchParams.get("filter")

  const [selectedTrack, setSelectedTrack] = useState(trackParam ? trackParam : "Forest Raceway")

  const [filter, setFilter] = useState<any>({
    key: null,
    data: [],
  })

  const { data: trackData, error, isLoading } = useSWR(`/records/track/${selectedTrack}`)

  useEffect(() => {
    return () => setFilter({ key: null, data: [] })
  }, [selectedTrack])

  useEffect(() => {
    if (trackParam) setSelectedTrack(trackParam)
  }, [trackParam])

  useEffect(() => {
    if (isLoading) return

    if (filterParam)
      setFilter({
        key: filterParam,
        data: trackData.records.filter((c) => c.category === filterParam),
      })
  }, [isLoading])

  function handleTrackSelect(e) {
    setSelectedTrack(e.target.value)
    router.replace(
      `/records/track?track=${e.target.value}${filterParam ? `&filter=${filterParam}` : ""}`
    )
  }

  const categories = [
    ...(new Set(trackData?.records.map((record) => record.category)) as any),
  ].sort((a: any, b: any) => -a.localeCompare(b))

  const handleFilter = (cat) => {
    setFilter({
      key: cat,
      data: trackData.records.filter((c) => c.category === cat),
    })
    router.replace(`/records/track?track=${selectedTrack}&filter=${cat}`)
  }

  const clearFilter = () => {
    setFilter({ key: null, data: [] })
    router.replace(`/records/track?track=${selectedTrack}`)
  }

  const Content = () => {
    if (error)
      return <div className="flex justify-center text-lg font-semibold">Failed to Load</div>

    if (isLoading) return <SkeletonTable />

    const sortingKeys = ["lap_time", "average_speed", "split_1", "split_2", "bike"]

    return (
      <TrackRecordsTable
        trackRecords={filter.key ? filter.data : trackData.records}
        defaultPageSize={PAGE_SIZE}
        searchEnabled={true}
        pageSizeEnabled={true}
        paginationEnabled={true}
        sortingKeys={sortingKeys}
        expandable={{
          render: (record) => (
            <RiderWorldRecordsTableRow row={{ ...record, _id: record.rider_guid }} />
          ),
        }}
        {...props.table}
      />
    )
  }

  const alert = applicationAlerts.alerts["FinnsFarm"]

  return (
    <div className="w-full overflow-auto">
      {(selectedTrack === "FinnsFarm" || selectedTrack === "FinnsFarmSX") && (
        <div className="mb-8">
          <GeneralEventAlert alert={alert} />
        </div>
      )}

      <div className="mb-4 flex w-full flex-wrap items-center justify-end gap-4 md:flex-nowrap md:justify-between">
        <select
          value={selectedTrack}
          className="select select-sm border-none bg-base-200"
          onChange={handleTrackSelect}
        >
          {trackList.map((track) => (
            <option key={track._id} value={track.name}>
              {track.name}
            </option>
          ))}
        </select>

        <div className="mx-4">
          <DropdownMenu>
            <div className="flex items-center justify-center gap-4">
              {filter.key && (
                <div onClick={clearFilter}>
                  <Pill
                    text={
                      <div className="group flex cursor-pointer items-center justify-center gap-2 text-xs">
                        {filter.key}
                        <X size={12} className="group-hover:text-primary" />
                      </div>
                    }
                    color="base"
                  />
                </div>
              )}
              <DropdownMenuTrigger className="flex select-none items-center gap-2">
                <div className="text-sm">Filters</div>
                <Filter size={16} className={filter.key ? "text-primary" : ""} />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <div>Categories</div>
              </DropdownMenuLabel>
              {categories?.map((cat, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={() => handleFilter(cat)}
                  className={cn(
                    "min-w-[200px] capitalize",
                    filter.key === cat ? "text-primary" : ""
                  )}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Content />
    </div>
  )
}

const SkeletonTable = () => (
  <Table
    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((id) => ({
      _id: id.toString(),
      name: "",
      lapTime: "",
      averageSpeed: "",
      split1: "",
      split2: "",
      bike: "",
    }))}
    columns={[
      { key: "name", label: "Name" },
      { key: "lapTime", label: "Lap Time" },
      { key: "averageSpeed", label: "Average Speed" },
      { key: "split1", label: "Split 1" },
      { key: "split2", label: "Split 2" },
      { key: "bike", label: "Bike" },
    ]}
    defaultPageSize={PAGE_SIZE}
    searchEnabled={true}
    expandable={{
      render: () => <></>,
    }}
  />
)
