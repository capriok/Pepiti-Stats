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

interface Props {
  trackList: any
  table?: TableOptions
}

export default function TrackRecords(props: Props) {
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
      cat === filter.key
        ? { key: null, data: [] }
        : {
            key: cat,
            data: trackData?.records.filter((c) => c.category === cat),
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

      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-4 md:flex-nowrap">
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
        <div className="no-scrollbar flex gap-2 overflow-x-scroll">
          {categories.map((cat, i) => (
            <Pill
              key={i}
              text={cat}
              color={filter.key === cat ? "primary" : "base"}
              className="cursor-pointer select-none px-4 py-1.5"
              onClick={() => handleFilter(cat)}
            />
          ))}
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
