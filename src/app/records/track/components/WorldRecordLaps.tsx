"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import Table, { TableOptions } from "~/ui/Table"
import { TrackRecordsTable } from "~/components/tables/records/TrackRecordsTable"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import RiderWorldRecordsTableRow from "~/components/tables/expandable/RiderWorldRecordsTableRow"
import GeneralEventAlert from "~/components/alerts/GeneralEventAlert"

import applicationAlerts from "@/data/application-alerts.json"
import Pill from "~/components/pills/Pill"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/ui/Dropdown"
import { Filter, MoreHorizontal, X } from "lucide-react"
import cn from "~/utils/cn"

interface Props {
  trackList: any
  table?: TableOptions
}

export default function WorldRecordLaps(props: Props) {
  const { trackList } = props

  const router = useRouter()
  const searchParams = useSearchParams()
  const trackParam = searchParams.get("track")

  const [selectedTrack, setSelectedTrack] = useState(trackParam ? trackParam : "Forest Raceway")

  const [filter, setFilter] = useState({
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

  function handleTrackSelect(e) {
    setSelectedTrack(e.target.value)
    router.push(`/records/track?track=${e.target.value}`)
  }

  const categories = [
    ...(new Set(trackData?.records.map((record) => record.category)) as any),
  ].sort((a: any, b: any) => -a.localeCompare(b))

  const handleFilter = (cat) =>
    setFilter(
      filter.key === cat
        ? { key: null, data: [] }
        : {
            key: cat,
            data: trackData.records.filter((c) => c.category === cat),
          }
    )

  const Content = () => {
    if (error)
      return <div className="flex justify-center text-lg font-semibold">Failed to Load</div>

    if (isLoading) return <SkeletonTable />

    return (
      <TrackRecordsTable
        trackRecords={filter.key ? filter.data : trackData.records}
        resultsEnabled={true}
        searchEnabled={true}
        paginationEnabled={true}
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
            <DropdownMenuTrigger className="flex items-center gap-2">
              <div className="text-sm">Filters</div>
              <Filter size={16} className={filter.key ? "text-primary" : ""} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
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
              <DropdownMenuItem className="mt-2">
                <div
                  className="group flex w-full cursor-pointer items-center justify-between"
                  onClick={() => setFilter({ key: null, data: [] })}
                >
                  <div>Clear</div>
                  <X size={14} className="group-hover:text-primary" />
                </div>
              </DropdownMenuItem>
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
    // prettier-ignore
    data={[
    {_id: '1', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '2', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '3', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '4', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '5', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '6', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '7', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '8', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '9', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '0', rank:"", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
  ]}
    // prettier-ignore
    searchEnabled={true}
    columns={[
      { key: "rank", label: "Rank" },
      { key: "name", label: "Name" },
      { key: "lapTime", label: "Lap Time" },
      { key: "averageSpeed", label: "Average Speed" },
      { key: "split1", label: "Split 1" },
      { key: "split2", label: "Split 2" },
      { key: "bike", label: "Bike" },
    ]}
    expandable={{
      render: () => <></>,
    }}
  />
)
