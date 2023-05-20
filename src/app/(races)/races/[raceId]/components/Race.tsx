'use client'

import React, { useState } from 'react'
import PageHeader from '~/components/PageHeader'
import Tabs from '~/components/Tabs'
import MMRAnalysisTable from './MMRAnalysis'
import RaceHero from './RaceHero'
import RaceStandingsTable from './RaceStandingsTable'

interface Props {
  session: ProcessedRaceSession
}

export default function Race({ session }: Props) {
  console.log(session)

  const items = [
    {
      key: 'race1',
      label: 'Race 1',
      children: !session.races.race1 ? (
        <DataUnavailable />
      ) : (
        <RaceContent race={session.races.race1} />
      ),
    },
    {
      key: 'race2',
      label: 'Race 2',
      children: !session.races.race2 ? (
        <DataUnavailable />
      ) : (
        <RaceContent race={session.races.race2} />
      ),
    },
  ]

  const [tab, setTab] = useState(items[1])

  return (
    <div className="w-full lg:mx-2">
      <div className="ml-4 mt-2 md:mt-4">
        <Tabs
          items={items}
          defaultActive="race2"
          onChange={(tab) => setTab(tab)}
          renderChildren={false}
        />
      </div>
      <PageHeader
        wide={true}
        title={session.track}
        extra={<div className="text-lg font-semibold">{session.headCount + ' Riders'}</div>}
        marginTop={false}
      />
      {tab.children}
    </div>
  )
}

const RaceContent = ({ race }: { race: Race }) => {
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
