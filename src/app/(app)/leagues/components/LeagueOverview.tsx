'use client'

import { ArrowLeftIcon, VerifiedIcon } from 'lucide-react'
import Link from 'next/link'
import { Pill } from '~/components/pills/Pill'
import RiderLink from '~/components/RiderLink'
import Table from '~/components/Table'
import LeagueRaceCard from './LeagueRaceCard'

interface Props {
  rider: RiderProfile
  league: League
  host: RiderProfile
  eligibility: any
}

export default function LeagueOverview({ rider, league, host, eligibility }: Props) {
  console.log({ rider, league, host, eligibility })

  return (
    <>
      <div className="m-5 mx-2 md:mx-10">
        <div className="flex w-full justify-between">
          <div className="text-2xl font-semibold">{league.name}</div>
          <div data-tip="Verified League" className="tooltip tooltip-accent text-purple-600">
            {league.verified && <VerifiedIcon />}
          </div>
        </div>
        <div className="text-lg text-neutral-500">{league.description}</div>
      </div>

      <LeagueDetails league={league} host={host} />

      <div className="mt-10 text-lg font-semibold">League Requirements</div>
      <LeagueRequirements league={league} eligibility={eligibility} rider={rider} />

      <div className="mt-10 text-lg font-semibold">League Races</div>
      <LeagueRaces league={league} />

      <div className="mt-10 text-lg font-semibold">League Standings</div>
      <LeagueStandings league={league} />
    </>
  )
}

const LeagueDetails = ({ league, host }) => (
  <div className="card card-body mx-2 bg-base-200">
    <div className="grid w-full grid-cols-2">
      <div className="flex flex-col">
        <div className="mb-4 text-lg font-semibold">League Information</div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-neutral-500">Verified:</div>
          <Pill
            text={league.verified ? 'False' : 'True'}
            color={league.verified ? 'neutral' : 'secondary'}
          />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-neutral-500">Host:</div>
          <RiderLink href={`/profile/${host._id}`} donator={host.donation > 0}>
            {host.name}
          </RiderLink>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-neutral-500">Riders:</div>
          {league.total_riders}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 text-lg font-semibold">League Configuration</div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-neutral-500">Lock Bike Choice:</div>
          <Pill
            text={league.keep_bike_selection ? 'False' : 'True'}
            color={league.keep_bike_selection ? 'neutral' : 'red'}
          />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-neutral-500">Lock Race Number:</div>
          <Pill
            text={league.keep_race_number ? 'False' : 'True'}
            color={league.keep_race_number ? 'neutral' : 'red'}
          />
        </div>
      </div>
    </div>
  </div>
)

const LeagueRequirements = ({ league, eligibility, rider }) => {
  const requirements = [
    {
      label: 'MMR',
      eligible: eligibility.MMR,
      requiredTotal: league.requirements.MMR,
      riderTotal: rider.MMR,
    },
    {
      label: 'SR',
      eligible: eligibility.SR,
      requiredTotal: league.requirements.SR,
      riderTotal: rider.SR,
    },
    {
      label: 'Races',
      eligible: eligibility.races,
      requiredTotal: league.requirements.races,
      riderTotal: rider.races.total_races,
    },
    {
      label: 'Laps',
      eligible: eligibility.laps,
      requiredTotal: league.requirements.laps,
      riderTotal: rider.total_laps,
    },
  ]

  return (
    <div className="stats mt-2 w-full bg-base-200">
      {requirements.map((requirement) => (
        <div
          key={requirement.label}
          className={`stat place-items-center ${
            requirement.eligible ? 'text-secondary' : 'text-error'
          }`}>
          <div className="stat-title">{requirement.label}</div>
          <div className="stat-value my-2 text-2xl">{requirement.requiredTotal + '+'}</div>
          <div className="stat-desc">
            You have {requirement.riderTotal} {requirement.label}
          </div>
        </div>
      ))}
    </div>
  )
}

const LeagueRaces = ({ league }) => {
  return (
    <>
      soon
      {/* <div>
        <h2 className="mt-1">Races</h2>
        <div className="relative overflow-x-auto scroll-smooth whitespace-nowrap py-3">
          {league.races.map((race) => (
            <LeagueRaceCard key={race._id} race={race} />
          ))}
        </div>
      </div> */}
    </>
  )
}

const LeagueStandings = ({ league }) => {
  const data = Object.keys(league.riders).map((guid) => {
    const rider = league.riders[guid]

    return { _id: rider.guid, ...rider }
  })
  const columns = [
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => <RiderLink href={`/profile/${row.guid}`}>{name}</RiderLink>,
    },
    {
      key: 'race_number',
      label: 'Race #',
      render: (race_number, row) => (
        <div className="flex gap-2">
          <div className="text-neutral-500">#</div>
          <div className="text-secondary">{race_number}</div>
        </div>
      ),
    },
    {
      key: 'points',
      label: 'Points',
      render: (points, row) => points ?? '-',
    },
    {
      key: 'bike_id',
      label: 'Bike',
    },
    {
      key: 'team',
      label: 'Team',
    },
  ]

  return <Table data={data} columns={columns} />
}
