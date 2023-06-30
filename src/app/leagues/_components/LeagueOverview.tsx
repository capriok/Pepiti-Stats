"use client"

import { Bike, CheckIcon, RocketIcon, VerifiedIcon } from "lucide-react"
import React from "react"
import BikeTicTac from "~/components/pills/BikeTicTac"
import Pill from "~/components/pills/Pill"
import RiderLink from "~/components/RiderLink"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Card, CardContent } from "~/ui/Card"
import Table from "~/ui/Table"
import LeagueRaceCard from "./LeagueRaceCard"

interface Props {
  user: User
  rider: RiderProfile
  league: League
  host: RiderProfile
  eligibility: LeagueEligibility
}

const LeagueContext = React.createContext({} as any)
export const useLeagueContext = () => React.useContext(LeagueContext)

export default function LeagueOverview({ user, rider, league, host, eligibility }: Props) {
  console.log("%cLeague", "color: steelblue", { user, rider, league, host, eligibility })

  const isInLeague = eligibility.league_joined === true
  const leagueRider = league.riders[rider._id] ?? {}

  return (
    <LeagueContext.Provider value={{ user, rider, league, host, eligibility }}>
      <LeagueBanner league={league} />

      <LeagueAlert isInLeague={isInLeague} rider={leagueRider} />

      <div className="mb-2 mt-4 text-xl font-semibold md:mb-4 md:mt-10">League Information</div>
      <LeagueInformation league={league} host={host} />

      <div className="mb-2 mt-4 text-xl font-semibold md:mb-4 md:mt-10">League Requirements</div>
      <LeagueRequirements league={league} eligibility={eligibility} rider={rider} />

      <div className="mb-2 mt-4 text-xl font-semibold md:mb-4 md:mt-10">League Races</div>
      <LeagueRaces league={league} />

      <div className="mb-2 mt-4 text-xl font-semibold md:mb-4 md:mt-10">League Standings</div>
      <LeagueStandings league={league} />
    </LeagueContext.Provider>
  )
}

const LeagueAlert = ({ isInLeague, rider }: { isInLeague: boolean; rider: LeagueRider }) => {
  if (!isInLeague) return <></>

  return (
    <>
      <Alert className="mb-2">
        <RocketIcon size={20} />
        <AlertTitle>Ready to Race!</AlertTitle>
        <AlertDescription>
          <div className="flex">You are in the League</div>
        </AlertDescription>
      </Alert>
      <div className="mb-8 rounded-md border border-accent/40 bg-base-200">
        {rider.guid && (
          <div className="grid w-full grid-cols-2 place-items-center p-4">
            <div>
              <div className="mb-2 flex flex-col items-center justify-center gap-2">
                <div className="text-md text-accent">Rider Name:</div>
                <RiderLink href={`/profile/${rider.guid}`} name={rider.name} />
              </div>
              <div className="mb-2 flex flex-col items-center justify-center gap-2">
                <div className="text-md text-accent">Team Name:</div>
                {rider.team}
              </div>
            </div>
            <div>
              <div className="mb-2 flex flex-col items-center justify-center gap-2">
                <div className="text-md text-accent">Race #:</div>
                {rider.race_number}
              </div>
              <div className="mb-2 flex flex-col items-center justify-center gap-2">
                <div className="text-md text-accent">Bike Choice:</div>
                <BikeTicTac bike={rider.bike_id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const LeagueBanner = ({ league }: { league: League }) => {
  return (
    <div className="m-8">
      <div className="flex w-full justify-between">
        <div className="text-2xl font-semibold">{league.name}</div>
        <div data-tip="Verified League" className="tooltip-accent tooltip text-purple-600">
          {league.verified && <VerifiedIcon />}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="text-lg text-accent">{league.description}</div>
      </div>
    </div>
  )
}

const LeagueInformation = ({ league, host }: { league: League; host: RiderProfile }) => (
  <Card>
    <CardContent className="mt-4 grid w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-accent">Host:</div>
          <RiderLink href={`/profile/${host._id}`} name={host.name} donator={host.donation > 0} />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-md text-accent">Riders:</div>
          {league.total_riders}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-accent">Lock Bike Choice:</div>
          <Pill
            text={league.keep_bike_selection ? "True" : "False"}
            color={league.keep_bike_selection ? "primary" : "neutral"}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="text-md text-accent">Lock Race Number:</div>
          <Pill
            text={league.keep_race_number ? "True" : "False"}
            color={league.keep_race_number ? "primary" : "neutral"}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

const LeagueRequirements = ({
  league,
  eligibility,
  rider,
}: {
  league: League
  eligibility: LeagueEligibility
  rider: RiderProfile
}) => {
  const requirements = [
    {
      label: "MMR",
      eligible: eligibility.MMR,
      requiredTotal: league.requirements.MMR,
      riderTotal: rider.MMR,
    },
    {
      label: "SR",
      eligible: eligibility.SR,
      requiredTotal: league.requirements.SR,
      riderTotal: rider.SR,
    },
    {
      label: "Laps",
      eligible: eligibility.laps,
      requiredTotal: league.requirements.laps,
      riderTotal: rider.total_laps,
    },
    {
      label: "Races",
      eligible: eligibility.races,
      requiredTotal: league.requirements.races,
      riderTotal: rider.races.total_races,
    },
    {
      label: "Records",
      eligible: eligibility.records,
      requiredTotal: league.requirements.records,
      riderTotal: rider.personal_records,
    },
  ]

  return (
    <div className="stats w-full rounded-lg border border-accent/40 bg-base-200 shadow-md">
      {requirements.map((requirement) => (
        <div key={requirement.label} className="stat place-items-center">
          <div className="stat-title">{requirement.label}</div>
          <div className="stat-value my-2 text-2xl">{requirement.requiredTotal + "+"}</div>
          <div className={`stat-desc ${requirement.eligible ? "text-primary" : "text-error"}`}>
            You have {requirement.riderTotal} {requirement.label}
          </div>
        </div>
      ))}
    </div>
  )
}

const LeagueRaces = ({ league }: { league: League }) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {league.races.map((race) => (
        <LeagueRaceCard key={race._id} race={race} />
      ))}
    </div>
  )
}

const LeagueStandings = ({ league }: { league: League }) => {
  const data = Object.keys(league.riders).map((guid) => ({
    _id: guid,
    ...league.riders[guid],
  }))

  const columns = [
    {
      key: "race_number",
      label: "Race #",
      render: (race_number) => (
        <div className="flex gap-2">
          <div className="text-accent">#</div>
          <div className="text-primary">{race_number}</div>
        </div>
      ),
    },
    {
      key: "name",
      label: "Rider",
      render: (name, row) => <RiderLink href={`/profile/${row.guid}`} name={name} />,
    },
    {
      key: "score",
      label: "Score",
      render: (score) => score ?? "-",
    },
    {
      key: "bike_id",
      label: "Bike",
      render: (bike) => <BikeTicTac bike={bike} />,
    },
    {
      key: "team",
      label: "Team",
    },
  ]

  const sortKeys = ["name", "score", "bike_id", "team"]

  return <Table data={data} columns={columns} sortingEnabled={true} sortingKeys={sortKeys} />
}
