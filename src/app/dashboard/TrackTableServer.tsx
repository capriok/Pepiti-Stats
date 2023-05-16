import React from 'react'
import Api from '~/api/api'
import { TrackTable } from '~/components/tables/TrackTable'

interface Props {
  selectedTrack: string
}

export default async function TrackTableServer({ selectedTrack }: Props) {
  const trackStats = await Api.GetTrackRecords(selectedTrack)
  console.log(trackStats)

  return <TrackTable records={trackStats?.records.slice(0, 10)} />
}
