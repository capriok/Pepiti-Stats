'use client'

import useSWR from 'swr'
import { dateIsValid } from '~/utils/dateIsValid'
import { handleLapTimes } from '~/utils/handleLapTimes'
import handlePlaceSuffix from '~/utils/handlePlaceSuffix'
import MMRPill from '~/components/pills/MMRPill'
import Table from '~/components/Table'
import { Pill } from '~/components/pills/Pill'
import { fetcher } from '~/api'
import Spinner from '~/components/Spinner'

interface Props {
  guid: string
}

export default function RiderRacesTable({ guid }: Props) {
  const { data, isLoading } = useSWR(`/rider/${guid}/races`, fetcher)

  if (isLoading)
    return (
      <div className="my-5">
        <Spinner />
      </div>
    )

  const races = data.races.map((race) => ({
    date: parseInt(race._id.slice(0, 8), 16) * 1000,
    track: race.track,
    position: race?.Classification?.Pos ?? '',
    laps: race?.Classification?.Laps ?? '',
    gap: race?.Classification?.Gap ?? '',
    penalties: race?.Classification?.Penalty ?? '',
    fastestLap: race.FastestLap,
    mmrGain: race.MMR.total,
    newMMR: race.MMR.old_MMR + race.MMR.total,
  }))

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (date, row) =>
        dateIsValid(new Date(date)) ? new Date(date).toLocaleDateString() : '-',
    },
    {
      key: 'track',
      label: 'Track',
      render: (track, row) => (track ? track : '-'),
    },
    {
      key: 'position',
      label: 'Position',
      render: (position, row) => (position ? <b>{handlePlaceSuffix(position)}</b> : '-'),
    },
    {
      key: 'gap',
      label: 'Gap',
      render: (gap, row) => (gap ? handleLapTimes(gap) : '-'),
    },
    {
      key: 'laps',
      label: 'Laps',
      render: (laps, row) => (laps ? laps : '-'),
    },
    {
      key: 'penalties',
      label: 'Penalties',
      render: (penalties, row) => (penalties ? penalties + ' s' : '-'),
    },
    {
      key: 'fastestLap',
      label: 'Fastest Lap',
      render: (fastestLap, row) => (fastestLap ? handleLapTimes(fastestLap) : '-'),
    },
    {
      key: 'mmrGain',
      label: 'MMR +/-',
      render: (mmrGain, row) => <MMRPill mmr={mmrGain} />,
    },
    {
      key: 'newMMR',
      label: 'New MMR',
      render: (newMMR, row) => <Pill text={newMMR} />,
    },
  ]

  return (
    <Table
      columns={columns}
      data={races}
      searchKey="track"
      searchEnabled={true}
      paginationEnabled={true}
      rankEnabled={false}
    />
  )
}
