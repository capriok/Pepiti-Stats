'use client'

import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import Spinner from '~/components/Spinner'
import Table from '~/components/Table'
import ServerTrackTable from './ServerTrackTable'

interface Props {
  trackList: any
}

export default function TrackRecords({ trackList }: Props) {
  const [selectedTrack, setSelectedTrack] = useState('Forest Raceway')

  const trackSelectOptions = trackList.map((track) => (
    <option key={track._id} value={track.name}>
      {track.name}
    </option>
  ))

  function handleTrackSelect(e) {
    setSelectedTrack(e.target.value)
  }

  return (
    <div className="overflow-auto md:w-full">
      <h3 className="text-lg font-semibold mb-2">Track Records</h3>
      <Suspense fallback={<SkeletonTable />}>
        <select
          value={selectedTrack}
          className="select w-full bg-base-200 mb-1 border-none select-xs md:select-sm"
          onChange={handleTrackSelect}>
          {trackSelectOptions}
        </select>
        {/* @ts-expect-error */}
        <ServerTrackTable selectedTrack={selectedTrack} />
      </Suspense>
      <div className="w-full text-right mt-2">
        <Link href={`/track/${selectedTrack}`} className="text-sm text-primary link no-underline">
          See More
        </Link>
      </div>
    </div>
  )
}

const SkeletonTable = () => (
  <>
    <select className="select w-full bg-base-200 mb-1 border-none select-xs md:select-sm">
      <option key="loading" value="loading">
        <Spinner />
      </option>
    </select>
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
  </>
)
