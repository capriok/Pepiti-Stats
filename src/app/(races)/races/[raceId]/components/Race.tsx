'use client'

import React from 'react'
import PageHeader from '~/components/PageHeader'
import Tabs from '~/components/Tabs'
import MMRAnalysisTable from './MMRAnalysis'
import RaceHero from './RaceHero'
import RaceStandingsTable from './RaceStandingsTable'

interface Props {
  session: any
}

export default function Race({ session }: Props) {
  return (
    <div className="w-full">
      <PageHeader
        title={session.track}
        extra={<div className="text-lg font-semibold">{session.headCount + ' Riders'}</div>}
      />
      {!session.races.race2 ? <DataUnavailable /> : <RaceContent race={session.races.race2} />}
    </div>
  )
}

const RaceContent = ({ race }) => {
  const items = [
    {
      key: 'raceStandings',
      label: 'Race Standings',
      children: (
        <div className="max-h-full overflow-y-auto bg-table-bg bg-contain bg-center bg-no-repeat md:h-full">
          <RaceStandingsTable standings={race.standings} />
        </div>
      ),
    },
    {
      key: 'mmrAnalysis',
      label: 'MMR Analysis',
      children: (
        <div className="h-full overflow-y-auto bg-table-bg bg-contain bg-center bg-no-repeat">
          <MMRAnalysisTable standings={race.standings} />
        </div>
      ),
    },
  ]

  return (
    <>
      <RaceHero race={race} winner={race.winner} />
      <Tabs items={items} wide={true} />
    </>
  )
}

const DataUnavailable = () => {
  return (
    <div className="mt-20 flex flex-col  items-center">
      <h1 className="title opacity-50">Race data not available yet</h1>
      <p className="caption mt-2">Check back in a few minutes</p>
    </div>
  )
}
