'use client'

import Link from 'next/link'
import React, { use, useState } from 'react'
import Api from '~/api/api'
import { TrackTable } from '~/components/tables/TrackTable'
import TrackTableServer from './TrackTableServer'

interface Props {
  trackList: any
}

export default async function TopTracks({ trackList }: Props) {
  const [selectedTrack, setSelectedTrack] = useState('Forest Raceway')

  const trackStats = await Api.GetTrackRecords(selectedTrack)
  console.log(trackStats)

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
      <h3 className="font-bold text-lg mb-4">Track Records</h3>
      <div className="flex px-1">
        <select
          value={selectedTrack}
          className="select w-full border-none select-xs md:select-sm"
          onChange={handleTrackSelect}>
          {trackSelectOptions}
        </select>
      </div>
      {/* @ts-expect-error */}
      <TrackTableServer selectedTrack={selectedTrack} />
      <div className="w-full text-right ">
        <Link href={`/track/${selectedTrack}`} className="text-sm text-primary link no-underline">
          See More
        </Link>
      </div>
    </div>
  )
}
