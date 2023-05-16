'use client'

import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import Api from '~/api/api'
import Spinner from '~/components/Spinner'
import TrackTableServer from './TrackTableServer'

interface Props {
  trackList: any
}

export default function TopTracks({ trackList }: Props) {
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
      <h3 className="font-bold text-lg mb-4">Track Records</h3>
      <div className="flex px-1">
        <select
          value={selectedTrack}
          className="select w-full border-none select-xs md:select-sm"
          onChange={handleTrackSelect}>
          {trackSelectOptions}
        </select>
      </div>
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error */}
        <TrackTableServer selectedTrack={selectedTrack} />
      </Suspense>
      <div className="w-full text-right ">
        <Link href={`/track/${selectedTrack}`} className="text-sm text-primary link no-underline">
          See More
        </Link>
      </div>
    </div>
  )
}
