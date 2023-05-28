"use client"

import React, { useState } from "react"
import PageHeader from "~/components/PageHeader"
import Tabs from "~/components/Tabs"
import MMRAnalysisTable from "./MMRAnalysisTable"
import RaceOverview from "./RaceOverview"
import RaceStandingsTable from "./RaceStandingsTable"

interface Props {
  session: ProcessedRaceSession
}

export default function Race({ session }: Props) {
  const items = [
    {
      key: "race1",
      label: "Race 1",
      children: !session.races.race1 ? (
        <DataUnavailable />
      ) : (
        <RaceContent race={session.races.race1} />
      ),
    },
    {
      key: "race2",
      label: "Race 2",
      children: !session.races.race2 ? (
        <DataUnavailable />
      ) : (
        <RaceContent race={session.races.race2} />
      ),
    },
  ]

  const [tab, setTab] = useState(items[1])

  return (
    <div className="w-full">
      <div className="ml-4 mt-2">
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
        extra={<div className="text-lg font-semibold">{session.headCount + " Riders"}</div>}
        marginTop={false}
      />
      {tab.children}
    </div>
  )
}

const RaceContent = ({ race }: { race: Race }) => {
  const items = [
    {
      key: "raceStandings",
      label: "Race Standings",
      children: <RaceStandingsTable standings={race.standings} />,
    },
    {
      key: "mmrAnalysis",
      label: "MMR Analysis",
      children: <MMRAnalysisTable standings={race.standings} />,
    },
  ]

  return (
    <>
      <RaceOverview race={race} winner={race.winner} />
      <Tabs items={items} wide={true} />
    </>
  )
}

const DataUnavailable = () => {
  return (
    <div className="grid h-[90vh] w-full place-items-center">
      <div className="card card-body grid place-items-center bg-base-200">
        <div className="text-lg opacity-80">Race data not available</div>
        <p className="mt-2">Check back in later</p>
      </div>
    </div>
  )
}
