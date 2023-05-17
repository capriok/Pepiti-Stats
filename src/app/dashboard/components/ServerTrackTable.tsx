import React from 'react'
import Api from '~/api/api'
import { TrackRecordsTable } from '~/components/tables/TrackRecordsTable'

interface Props {
  selectedTrack: string
}

export default async function ServerTrackTable({ selectedTrack }: Props) {
  const trackStats = await Api.GetTrackRecords(selectedTrack)

  return <TrackRecordsTable records={trackStats?.records.slice(0, 10)} />
}
