'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import Table from '~/components/Table'
import { TrackRecordsTable } from '~/components/tables/TrackRecordsTable'
import { publicRequest } from '~/api'

interface Props {
  trackList: any
}

export default function TrackRecords({ trackList }: Props) {
  const [selectedTrack, setSelectedTrack] = useState('Forest Raceway')

  const { data, error, isLoading } = useSWR(`/records/track/${selectedTrack}`, publicRequest)

  function handleTrackSelect(e) {
    setSelectedTrack(e.target.value)
  }

  const Content = ({ data, error, isLoading }) => {
    if (error)
      return <div className="flex justify-center text-lg font-semibold">Failed to Load</div>
    if (isLoading) return <SkeletonTable />

    const trackRecords = data?.records.slice(0, 10)

    return <TrackRecordsTable records={trackRecords} />
  }

  return (
    <div className="overflow-auto md:w-full">
      <h3 className="mb-2 text-lg font-semibold">Track Records</h3>
      <select
        value={selectedTrack}
        className="select select-xs mb-1 w-full border-none bg-base-200 md:select-sm"
        onChange={handleTrackSelect}>
        {trackList.map((track) => (
          <option key={track._id} value={track.name}>
            {track.name}
          </option>
        ))}
      </select>
      <Content data={data} error={error} isLoading={isLoading} />
      <div className="mt-2 w-full text-right">
        <Link href={`/track/${selectedTrack}`} className="link text-sm text-primary no-underline">
          See More
        </Link>
      </div>
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
    columns={[
      { key: 'rank', label: 'Rank' },
      { key: 'name', label: 'Name' },
      { key: 'lapTime', label: 'Lap Time' },
      { key: 'averageSpeed', label: 'Average Speed' },
      { key: 'split1', label: 'Split 1' },
      { key: 'split2', label: 'Split 2' },
      { key: 'bike', label: 'Bike' },
    ]}
  />
)
