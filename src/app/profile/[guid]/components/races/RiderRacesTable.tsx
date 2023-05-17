'use client'

import Link from 'next/link'
import { useState } from 'react'
import Table from '~/components/Table'
import { dateIsValid } from '~/utils/dateIsValid'
import { handleLapTimes } from '~/utils/handleLapTimes'
import handlePlaceSuffix from '~/utils/handlePlaceSuffix'

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
      key: 'laps',
      label: 'Laps',
      render: (laps, row) => (laps ? laps : '-'),
    },
    {
      key: 'gap',
      label: 'Gap',
      render: (gap, row) => (gap ? handleLapTimes(gap) : '-'),
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
      render: (mmrGain, row) => <MMRBadge mmr={mmrGain} />,
    },
    {
      key: 'newMMR',
      label: 'New MMR',
      render: (newMMR, row) => <MMRBadge mmr={newMMR} />,
    },
  ]

  return (
    <div className="pb-4">
      <div className="text-xl my-4 font-semibold">Recent Races</div>
      <Table columns={columns} data={data} rankEnabled={false} rowCn="py-4" />
    </div>
  )

  return (
    <>
      <div className="mt-5 mb-2">
        <input
          className="bg-neutral-700 w-full p-2 border-green-900 ring-green-900 focus:outline-none focus:border-green-500 focus:ring-green-500 rounded-md"
          placeholder="Search for track..."
          value={term}
          onChange={(event) => setTerm(event.currentTarget.value)}
          type="text"
        />
      </div>
      <div className="flex flex-col gap-3 text-neutral-400 drop-shadow-lg">
        {!races[0] && <p>No races...</p>}
        {races
          .filter((race) => race.track.toLowerCase().includes(term.toLowerCase()))
          .map((race, idx) => {
            const timestamp = race._id.slice(0, 8)
            const date = new Date(parseInt(timestamp, 16) * 1000)
            const handleBadgeColor =
              race.MMR.total > 0
                ? 'badge-primary'
                : race.MMR.total === 0
                ? 'badge-warning'
                : 'badge-error'

            return (
              <div key={idx} className="rounded-box bg-neutral-800/40 p-3">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-3">
                    <Link
                      prefetch={false}
                      className="link link-primary text-xl"
                      href={`/track/${race.track}`}>
                      {race.track}
                    </Link>
                    <Link
                      prefetch={false}
                      href={`/races/${race._id}`}
                      className="link link-hover text-neutral-400">
                      Race Details
                    </Link>
                  </div>

                  <p>{dateIsValid(date) ? date.toLocaleDateString() : '-'}</p>
                </div>
                <div className="divider divider-vertical"></div>
                {race.Classification && (
                  <>
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="caption">Previous MMR: {race.MMR.old_MMR}</span>
                        {/* <p className="caption">BPP: {race.MMR.BPP}</p>
                                 <p className="caption">PRB: {race.MMR.PRB}</p>
                                 <p className="caption">NRB: {race.MMR.NRB}</p>
                              <p className="caption">FL: {race.MMR.FL}</p> */}
                      </div>
                      <div className={`badge ${handleBadgeColor} badge-lg`}>
                        {race.MMR.total > 0 ? '+' + race.MMR.total : race.MMR.total}
                      </div>
                      <span className="caption mt-3 block">
                        Adjusted MMR: {race.MMR.old_MMR + race.MMR.total}
                      </span>
                    </div>
                    <ClassificationTab
                      classification={race.Classification}
                      fastestLap={race.FastestLap}
                    />
                  </>
                )}
                {/* {race.Race1 && (
                        <>
                           <div className="flex justify-between">
                              <h2 className="text-2xl font-bold">Race 1</h2>
                              <MMRBadge key={idx} mmr={race.Race1.MMR.total} />
                           </div>
                           <RaceContent race={race.Race1} />
                        </>
                     )}
                     {race.Race2 && (
                        <>
                           <div className="flex justify-between">
                              <h2 className="text-2xl font-bold">Race 2</h2>
                              <MMRBadge key={idx} mmr={race.Race2.MMR.total} />
                           </div>
                           <RaceContent race={race.Race2} />
                        </>
                     )} */}
                {!race.Classification && <p>No race data...</p>}
              </div>
            )
          })}
      </div>
    </>
  )
}

const MMRBadge = ({ mmr }: { mmr: number }) => {
  return (
    <div
      className={`${
        mmr > 0 ? 'bg-green-500/30' : mmr === 0 ? 'bg-orange-500/30' : 'bg-red-500/30'
      } w-fit px-2 py-1 rounded-full`}>
      <p
        className={`${
          mmr > 0 ? 'text-green-200' : mmr === 0 ? 'text-orange-200' : 'text-red-200'
        } font-semibold text-md`}>
        {mmr > 0 ? '+' + mmr : mmr}
      </p>
    </div>
  )
}

const FastestLapTab = ({ fastestLap }: { fastestLap: FastestLap }) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Position</p>
          <h3 className="text-2xl font-bold">{fastestLap.Pos}</h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Lap Time</p>
          <h3 className="text-2xl font-bold">
            {typeof fastestLap.LapTime !== 'string'
              ? handleLapTimes(fastestLap.LapTime as number)
              : fastestLap.LapTime}
          </h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Lap</p>
          <h3 className="text-2xl font-bold">{fastestLap.Lap ? `#${fastestLap.Lap}` : '-'}</h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Average Speed</p>
          <h3 className="text-2xl font-bold">
            {fastestLap.Speed ? fastestLap.Speed.toFixed(2) : '-'}
          </h3>
        </div>
      </div>
    </div>
  )
}
const ClassificationTab = ({
  classification,
  fastestLap,
}: {
  classification: Classification
  fastestLap: number
}) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mr-0 ml-0 not-prose">
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Position</p>
          <h3 className="text-2xl font-bold">{classification.Pos ?? '-'}</h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Laps</p>
          <h3 className="text-2xl font-bold">{classification.Laps ? classification.Laps : '-'}</h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Gap</p>
          <h3 className="text-2xl font-bold">
            {typeof classification.Gap === 'number' ? handleLapTimes(classification.Gap) : '-'}
          </h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Penalties</p>
          <h3 className="text-2xl font-bold">
            {classification.Penalty ? classification.Penalty : '-'}
          </h3>
        </div>
        <div className="bg-neutral-700/30 rounded-lg p-8">
          <p className="text-lg">Fastest Lap</p>
          <h3 className="text-2xl font-bold">{fastestLap ? handleLapTimes(fastestLap) : '-'}</h3>
        </div>
      </div>
    </div>
  )
}
