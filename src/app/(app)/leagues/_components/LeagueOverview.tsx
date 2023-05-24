'use client'

import { VerifiedIcon } from 'lucide-react'
import { createContext, useContext } from 'react'
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

const UserContext = createContext<User>({} as User)
export const useUserContext = () => useContext(UserContext)

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
        <div className="text-lg text-accent">{league.description}</div>
      </div>

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">League Details</div>
      <LeagueInformation league={league} host={host} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">League Requirements</div>
      <LeagueRequirements league={league} eligibility={eligibility} rider={rider} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">League Races</div>
      <LeagueRaces league={league} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">League Standings</div>
      <LeagueStandings league={league} />
    </>
  )
}

const LeagueInformation = ({ league, host }) => (
  <div className="card card-body bg-base-200">
    <div className="grid w-full grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col">
        <div className="mb-4 text-lg font-semibold">Information</div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-accent">Host:</div>
          <RiderLink href={`/profile/${host._id}`} donator={host.donation > 0}>
            {host.name}
          </RiderLink>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-accent">Riders:</div>
          {league.total_riders}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 text-lg font-semibold">Configuration</div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-accent">Lock Bike Choice:</div>
          <Pill
            text={league.keep_bike_selection ? 'True' : 'False'}
            color={league.keep_bike_selection ? 'secondary' : 'neutral'}
          />
        </div>
        <div className="mb-2 flex items-center gap-2">
          <div className="text-md text-accent">Lock Race Number:</div>
          <Pill
            text={league.keep_race_number ? 'True' : 'False'}
            color={league.keep_race_number ? 'secondary' : 'neutral'}
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
    <div className="stats w-full bg-base-200">
      {requirements.map((requirement) => (
        <div key={requirement.label} className="stat place-items-center">
          <div className="stat-title">{requirement.label}</div>
          <div className="stat-value my-2 text-2xl">{requirement.requiredTotal + '+'}</div>
          <div className={`stat-desc ${requirement.eligible ? 'text-secondary' : 'text-error'}`}>
            You have {requirement.riderTotal} {requirement.label}
          </div>
        </div>
      ))}
    </div>
  )
}

const LeagueRaces = ({ league }) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {league.races.map((race) => (
        <LeagueRaceCard key={race._id} race={race} />
      ))}
    </div>
  )
}

const LeagueStandings = ({ league }) => {
  const data = Object.keys(league.riders).map((guid) => ({
    _id: league.riders[guid],
    ...league.riders[guid],
  }))

  const columns = [
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => <RiderLink href={`/profile/${row.guid}`}>{name}</RiderLink>,
    },
    {
      key: 'race_number',
      label: 'Race #',
      render: (race_number) => (
        <div className="flex gap-2">
          <div className="text-accent">#</div>
          <div className="text-secondary">{race_number}</div>
        </div>
      ),
    },
    {
      key: 'points',
      label: 'Points',
      render: (points) => points ?? '-',
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
