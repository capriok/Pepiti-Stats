"use client"

import React, { useState } from "react"
import PageLayout from "~/components/PageLayout"
import WinnerCircle from "./components/WinnerCircle"
import RaceStandings from "./components/RaceStandings"
import RaceMMRAnalysis from "./components/RaceMMRAnalysis"
import RaceScatter from "./components/RaceScatter"
import RaceNotables from "./components/RaceNotables"
import Tabs from "~/ui/Tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/Card"

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
    <PageLayout
      width="wide"
      header={{
        title: session.track,
        extra: (
          <div className="flex flex-col items-end gap-2">
            <div className="text-lg font-semibold">{session.headCount + " Riders"}</div>
          </div>
        ),
        subExtra: (
          <Tabs
            items={items}
            defaultActive="race2"
            onChange={(tab) => setTab(tab)}
            renderChildren={false}
          />
        ),
      }}
    >
      {tab.children}
    </PageLayout>
  )
}

const RaceContent = ({ race }: { race: Race }) => {
  const items = [
    {
      key: "raceStandings",
      label: "Race Standings",
      children: <RaceStandings standings={race.standings} />,
    },
    {
      key: "mmrAnalysis",
      label: "MMR Analysis",
      children: <RaceMMRAnalysis standings={race.standings} />,
    },
    {
      key: "raceScatter",
      label: "Scatter Analysis",
      children: <RaceScatter standings={race.standings} />,
    },
  ]

  return (
    <div className="md:mx-4">
      <div className="my-5 flex flex-col gap-5 xl:flex-row">
        <WinnerCircle race={race} />
        <RaceNotables race={race} />
      </div>
      <Card>
        <Tabs items={items} wide={true} />
      </Card>
    </div>
  )
}

const DataUnavailable = () => {
  return (
    <div className="grid h-[90vh] w-full place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Race data not available</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Check back in later</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
