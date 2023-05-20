'use client'
import { useState } from 'react'
import { dateIsValid } from '~/utils/dateIsValid'
import { handleLapTimes } from '~/utils/handleLapTimes'
import handlePlaceSuffix from '~/utils/handlePlaceSuffix'
import MMRPill from '~/components/pills/MMRPill'
import Table from '~/components/Table'
import { Pill } from '~/components/pills/Pill'

interface Props {
  races: any
}

export default function RiderRacesTable({ races }: Props) {
  const [term, setTerm] = useState('')

  const data = races.map((race) => ({
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

  const filteredData = data.filter((race) => race.track.toLowerCase().includes(term.toLowerCase()))

  return (
    <div className="pb-4">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="my-4 whitespace-nowrap text-xl font-semibold">Recent Races</div>
        <input
          className="input-bordered input input-sm w-full md:w-[400px]"
          placeholder="Search by Track..."
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <Table columns={columns} data={filteredData} rankEnabled={false} rowCn="py-4" />
    </div>
  )
}
