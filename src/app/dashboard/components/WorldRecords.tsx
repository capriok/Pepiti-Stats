"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import Table, { TableOptions } from "~/ui/Table"
import { TrackRecordsTable } from "~/components/tables/records/TrackRecordsTable"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "~/ui/Button"
import { ChevronsRight } from "lucide-react"

interface Props {
  trackList: any
  table?: TableOptions
}

export default function WorldRecords(props: Props) {
  const { trackList } = props

  const searchParams = useSearchParams()
  const trackParam = searchParams.get("track")

  const [selectedTrack, setSelectedTrack] = useState(trackParam ? trackParam : "Forest Raceway")

  useEffect(() => {
    if (trackParam) setSelectedTrack(trackParam)
  }, [trackParam])

  function handleTrackSelect(e) {
    setSelectedTrack(e.target.value)
  }

  const Content = () => {
    const { data, error, isLoading } = useSWR(`/records/track/${selectedTrack}`)

    if (error)
      return <div className="flex justify-center text-lg font-semibold">Failed to Load</div>

    if (isLoading) return <SkeletonTable />

    return (
      <TrackRecordsTable
        {...props.table}
        trackRecords={data.records}
        resultsEnabled={false}
        searchEnabled={false}
        paginationEnabled={false}
      />
    )
  }

  return (
    <div className="w-full overflow-auto">
      <div className="group flex justify-between">
        <Link href={`/records/track?track=${selectedTrack}`} className="w-full">
          <div className="mb-2 text-lg font-semibold">World Record Laps</div>
        </Link>
        <Link
          href="/records/track"
          title="Explore track records"
          className="hidden group-hover:flex"
        >
          <Button variant="ghost">
            <ChevronsRight size={14} />
          </Button>
        </Link>
      </div>
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
      <Content />
    </div>
  )
}

const SkeletonTable = () => (
  <Table
    // prettier-ignore
    data={[
    {_id: '1', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '2', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '3', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '4', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '5', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '6', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '7', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '8', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '9', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
    {_id: '0', name:"-", lapTime:"-", averageSpeed:"-", split1:'-', split2:'-', bike: '-'},
  ]}
    // prettier-ignore
    columns={[
      { key: "name", label: "Name" },
      { key: "lapTime", label: "Lap Time" },
      { key: "averageSpeed", label: "Average Speed" },
      { key: "split1", label: "Split 1" },
      { key: "split2", label: "Split 2" },
      { key: "bike", label: "Bike" },
    ]}
  />
)
