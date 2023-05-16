import React from 'react'
import Api from '~/api/api'
import { TrackTable } from '~/components/tables/TrackTable'

interface Props {
  selectedTrack: string
}

export default async function ServerTrackTable({ selectedTrack }: Props) {
  const trackStats = await Api.GetTrackRecords(selectedTrack)

  return <TrackTable records={trackStats?.records.slice(0, 10)} />
}
