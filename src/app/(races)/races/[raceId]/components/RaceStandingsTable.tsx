import Link from 'next/link'
import React, { useState } from 'react'
import RiderLink from '~/components/RiderLink'
import Table from '~/components/Table'
import { handleLapTimes } from '~/utils/handleLapTimes'
import handlePlaceSuffix from '~/utils/handlePlaceSuffix'

interface Props {
  standings: any
}

export const RaceStandingsTable = ({ standings }: Props) => {
  const tableColumns = [
    {
      key: 'name',
      label: 'Name',
      render: (name, row) => <RiderLink href={`/profile/${row._id}`}>{name}</RiderLink>,
    },
    {
      key: 'raceNumber',
      label: 'Race #',
      render: (raceNumber, row) => `# ${raceNumber}`,
    },
    {
      key: 'position',
      label: 'Position',
      render: (position, row) =>
        position ? position ? <b>{handlePlaceSuffix(position)}</b> : '-' : '-',
    },
    {
      key: 'gap',
      label: 'Gap',
      render: (gap, row) => (gap ? handleLapTimes(gap) : '-'),
    },
    {
      key: 'raceTime',
      label: 'Race Time',
      render: (raceTime, row) => (raceTime ? handleLapTimes(raceTime) : '-'),
    },
    {
      key: 'laps',
      label: 'Laps',
      render: (laps, row) => (laps ? laps : '-'),
    },
    {
      key: 'penalty',
      label: 'Penalty',
      render: (penalty, row) => (penalty ? penalty : '-'),
    },
    {
      key: 'fastestLap',
      label: 'Fastest Lap',
      render: (fastestLap, row) => (fastestLap ? handleLapTimes(fastestLap) : '-'),
    },
  ]

  return (
    <>
      <Table columns={tableColumns} data={standings} />
    </>
  )
}

// interface Props {
//   raceSession: RaceSession
//   race: any
// }

// export const RaceStandingsTable = ({ raceSession, race }: Props) => {
//   const riders = Object.keys(raceSession.riders).map((raceNum) => ({
//     guid: raceSession.riders[raceNum].guid,
//     name: raceSession.riders[raceNum].name,
//     raceNum: raceSession.riders[raceNum].race_number,
//   }))

//   const data = riders
//     .map(({ guid, name, raceNum }) => ({
//       _id: guid,
//       name: name,
//       raceNum: raceNum,
//       raceTime: race.Classification[raceNum]?.RaceTime ?? '',
//       position: race.Classification[raceNum]?.Pos ?? '',
//       laps: race.Classification[raceNum]?.Laps ?? '',
//       gap: race.Classification[raceNum]?.Gap ?? '',
//       penalties: race.Classification[raceNum]?.Penalty ?? '',
//       fastestLap: race.FastestLap[raceNum],
//     }))
//     .sort((a, b) => {
//       if (typeof a.position === 'number' && typeof b.position === 'number') {
//         if (a.position === b.position) {
//           return a.raceNum - b.raceNum
//         }
//         return a.position - b.position
//       } else if (typeof a.position === 'number') {
//         return -1
//       } else if (typeof b.position === 'number') {
//         return 1
//       } else {
//         return a.raceNum - b.raceNum
//       }
//     })

//   const tableColumns = [
//     {
//       key: 'name',
//       label: 'Name',
//       render: (name, row) => <RiderLink href={`/profile/${row._id}`}>{name}</RiderLink>,
//     },
//     {
//       key: 'raceNum',
//       label: 'Race #',
//       render: (raceNum, row) => `# ${raceNum}`,
//     },
//     {
//       key: 'position',
//       label: 'Position',
//       render: (position, row) =>
//         position ? position ? <b>{handlePlaceSuffix(position)}</b> : '-' : '-',
//     },
//     {
//       key: 'gap',
//       label: 'Gap',
//       render: (gap, row) => (gap ? handleLapTimes(gap) : '-'),
//     },
//     {
//       key: 'raceTime',
//       label: 'Race Time',
//       render: (raceTime, row) => (raceTime ? handleLapTimes(raceTime) : '-'),
//     },
//     {
//       key: 'laps',
//       label: 'Laps',
//       render: (laps, row) => (laps ? laps : '-'),
//     },
//     {
//       key: 'penalties',
//       label: 'Penalties',
//       render: (penalties, row) => (penalties ? penalties : '-'),
//     },
//     {
//       key: 'fastestLap',
//       label: 'Fastest Lap',
//       render: (fastestLap, row) => (fastestLap ? handleLapTimes(fastestLap) : '-'),
//     },
//   ]

//   return (
//     <>
//       <Table columns={tableColumns} data={data} />
//     </>
//   )
// }

export default RaceStandingsTable
