"use client"

import React, { useState } from "react"
import useSWR from "swr"
import Table, { TableOptions } from "~/ui/Table"
import { TrackRecordsTable } from "~/components/tables/records/TrackRecordsTable"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "~/ui/Button"

interface Props {
  trackList: any
  table?: TableOptions
}

export default function TrackRecords(props: Props) {
  const { trackList } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const trackParam = searchParams.get("track")
  const isAtDashboard = pathname === "/dashboard"

  const [selectedTrack, setSelectedTrack] = useState(trackParam ? trackParam : "Forest Raceway")

  function handleTrackSelect(e) {
    setSelectedTrack(e.target.value)
    if (isAtDashboard) return
    router.replace(`/records/track?track=${e.target.value}`)
  }

  const Table = () => {
    const { data, error, isLoading } = useSWR(`/records/track/${selectedTrack}`)

    if (error)
      return <div className="flex justify-center text-lg font-semibold">Failed to Load</div>

    if (isLoading) return <SkeletonTable />

    return <TrackRecordsTable {...props.table} trackRecords={data.records} resultsEnabled={false} />
  }

  return (
    <div className="w-full overflow-auto">
      <Link href={`/records/track?track=${selectedTrack}`}>
        <div className="mb-2 text-lg font-semibold">Track Records</div>
      </Link>
      <select
        value={selectedTrack}
        className="select select-xs mb-2 w-full border-none bg-base-200 md:select-sm"
        onChange={handleTrackSelect}
      >
        {trackList.map((track) => (
          <option key={track._id} value={track.name}>
            {track.name}
          </option>
        ))}
      </select>
      <Table />
    </div>
  )
}

const SkeletonTable = () => (
  <Table
    // prettier-ignore
    data={[
    {_id: '1', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '2', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '3', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '4', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '5', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '6', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '7', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '8', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '9', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '0', rank:"-", name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
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
  />
)
