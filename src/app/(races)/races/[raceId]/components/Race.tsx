'use client'

import React from 'react'
import { publicRequest } from '~/api'
import PageHeader from '~/components/PageHeader'
import Tabs from '~/components/Tabs'
import MMRTable from './MMRAnalysis'
import RaceHero from './RaceHero'
import RaceOverview from './RaceOverview'
import useSwr from 'swr'
import Spinner from '~/components/Spinner'

interface Props {
  raceSession: RaceSession
}

export default function Race({ raceSession }: Props) {
  const race = raceSession['Race2']

  return (
    <div className="w-full">
      <PageHeader
        title={raceSession.track}
        extra={
          <div className="text-lg font-semibold">{raceSession.riders_guid.length + ' Riders'}</div>
        }
      />
      {!race ? <DataUnavailable /> : <RaceContent raceSession={raceSession} race={race} />}
    </div>
  )
}

const RaceContent = ({ raceSession, race }) => {
  const items = [
    {
      key: 'raceOverview',
      label: 'Race Overview',
      children: (
        <div className="max-h-full overflow-y-auto bg-table-bg bg-contain bg-center bg-no-repeat md:h-full">
          <RaceOverview raceSession={raceSession} race={race} />
        </div>
      ),
    },
    {
      key: 'mmrAnalysis',
      label: 'MMR Analysis',
      children: (
        <div className="h-full overflow-y-auto bg-table-bg bg-contain bg-center bg-no-repeat">
          <MMRTable raceSession={raceSession} race={race} />
        </div>
      ),
    },
  ]

  const winnerRaceNum = Object.keys(race.Classification).find(
    (raceNum) => race?.Classification[raceNum]?.Pos === 1
  )
  const winnerGuid = raceSession.riders[winnerRaceNum!].guid

  const { data: winner, isLoading } = useSwr(`/rider/${winnerGuid}`, publicRequest)

  if (isLoading) return <Spinner />

  return (
    <>
      <RaceHero raceSession={raceSession} race={race} winner={winner} />
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
