"use client"

import { CheckIcon, Rocket, RocketIcon } from "lucide-react"
import Table from "~/ui/Table"
import RiderLink from "~/components/RiderLink"
import Tabs from "~/ui/Tabs"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Card } from "~/ui/Card"
import { useEffect, useState } from "react"

interface Props {
  user: User
  race: LeagueRaceDetails
  eligibility: LeagueRaceEligibility
}

export default function LeagueRaceOverview({ user, race, eligibility }: Props) {
  console.log("%cLeagueRace", "color: steelblue", { user, race, eligibility })

  const isInRace = eligibility.race_joined === true
  const raceTime = race.timestamp

  if (!user.isAdmin)
    return (
      <div>
        <center className="text-sm text-primary-content">Admin Only, Coming Soon</center>
      </div>
    )

  return (
    <>
      <LeagueRaceAlert isInRace={isInRace} raceTime={raceTime} />

      <LeagueRaceInformation race={race} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">Race Configurations</div>
      <LeagueRaceConfig race={race} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">Division Leaderboards</div>
      <LeagueRaceTabs race={race} />
    </>
  )
}

const LeagueRaceAlert = ({ isInRace, raceTime }) => {
  const [countdown, setCountdown] = useState(timeToGateDrop(raceTime))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(timeToGateDrop(raceTime))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isInRace)
    return (
      <Alert className="mb-4">
        <Rocket size={20} />
        <AlertTitle>Attention!</AlertTitle>
        <AlertDescription>
          <div className="flex">
            The Race is Open for Registration, click the button above to Register
          </div>
        </AlertDescription>
      </Alert>
    )

  function timeToGateDrop(unixTimestamp: number): string {
    const timeDifference = Math.max(0, Math.floor(unixTimestamp - Date.now() / 1000))

    if (timeDifference <= 0) return "The race has finished!"

    const seconds = timeDifference % 60
    const minutes = Math.floor(timeDifference / 60) % 60
    const hours = Math.floor(timeDifference / (60 * 60)) % 24
    const days = Math.floor(timeDifference / (60 * 60 * 24))

    return `Gate drop in: ${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  return (
    <Alert className="mb-4 border-primary/80">
      <CheckIcon size={20} />
      <AlertTitle>Heads Up!</AlertTitle>
      <AlertDescription className="flex justify-between">
        <div>You are Registered for the Race</div>
        <div>{countdown}</div>
      </AlertDescription>
    </Alert>
  )
}

const LeagueRaceInformation = ({ race }: { race: LeagueRaceDetails }) => {
  return (
    <Card>
      <div className="grid w-full grid-cols-1 p-4 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-4 text-lg font-semibold">Information</div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Start Time:</div>
            {new Date(race.timestamp * 1000).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-md text-accent">Track:</div>
            {race.config.event.track}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4 text-lg font-semibold">Session</div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Max Riders:</div>
            <div>{race.config.connection.maxclient}</div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Deformation:</div>
            <div>{race.config.deformation.scale}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-md text-accent">Restart Delay:</div>
            <div>{race.config.race.restart_delay}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

const LeagueRaceConfig = ({ race }: { race: LeagueRaceDetails }) => {
  const configurations = [
    {
      label: "Practice Length",
      value: race.config.race.practice_length,
      desc: "Minutes",
    },
    {
      label: "Qualify Length",
      value: race.config.race.qualifypractice_length,
      desc: "Minutes",
    },
    {
      label: "Race Length",
      value: <div>{race.config.race.race_minutes}</div>,
      desc: (
        <div>
          Minutes{" "}
          {race.config.race.race_extralaps && "+ " + race.config.race.race_extralaps + " Laps"}
        </div>
      ),
    },
  ]

  return (
    <div className="grid place-items-center">
      <div className="stats flex w-full rounded-lg border border-accent/40 bg-base-200 shadow-md md:w-fit">
        {configurations.map((configuration) => (
          <div
            key={configuration.label}
            className="stat grid w-full place-items-center md:w-[250px]"
          >
            <div className="stat-title">{configuration.label}</div>
            <div className="stat-value my-2 text-lg">{configuration.value}</div>
            <div className="stat-desc">{configuration.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LeagueRaceTabs = ({ race }: { race: LeagueRaceDetails }) => {
  const items = race.divisions.map((division) => ({
    key: division.name,
    label: division.name,
    children: <LeagueRaceStandings division={division} />,
  }))

  return (
    <Card>
      <Tabs items={items} wide={true} />
    </Card>
  )
}

const LeagueRaceStandings = ({ division }: { division: LeagueRaceDivision }) => {
  const data = division.riders.map((rider) => ({
    _id: rider.guid,
    raceNumber: rider.race_number,
    name: rider.name,
    lapTime: rider.record.lap_time,
    averageSpeed: rider.record.average_speed,
    split1: rider.record.split_1,
    split2: rider.record.split_2,
    category: rider.record.category,
    bike: rider.record.bike,
  }))

  const columns = [
    {
      key: "raceNumber",
      label: "Race #",
    },
    {
      key: "name",
      label: "Rider",
      render: (name, row) => <RiderLink href={`/profile/${row.guid}`} name={name} />,
    },
    {
      key: "lapTime",
      label: "Lap Time",
      render: (lapTime) => (lapTime ? handleLapTimes(lapTime) : "-"),
    },
    {
      key: "averageSpeed",
      label: "Avg Speed",
      render: (averageSpeed) => (averageSpeed ? handleAverageSpeed(averageSpeed) : "-"),
    },
    {
      key: "split1",
      label: "Split 1",
      render: (split1) => (split1 ? handleLapTimes(split1) : "-"),
    },
    {
      key: "split2",
      label: "Split 2",
      render: (split2) => (split2 ? handleLapTimes(split2) : "-"),
    },
    {
      key: "bike",
      label: "Bike",
      render: (bike) => <BikeTicTac bike={bike} />,
    },
  ]

  const sortKeys = ["lapTime", "averageSpeed", "split1", "split2"]

  return <Table data={data} columns={columns} sortingKeys={sortKeys} />
}
