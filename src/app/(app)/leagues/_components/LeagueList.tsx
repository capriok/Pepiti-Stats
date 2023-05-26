'use client'

import { VerifiedIcon } from 'lucide-react'
import Link from 'next/link'
import Pill from '~/components/pills/Pill'

interface Props {
  leagues: Array<League>
}

export default function LeagueList({ leagues }: Props) {
  console.log('%cLeaguesList', 'color: steelblue', leagues)

  if (!leagues || !leagues.length)
    return <div className="flex w-full justify-center">No Results</div>

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
      {mockleagues.map((league) => (
        <LeagueCard key={league._id} league={league} />
      ))}
    </div>
  )
}

const LeagueCard = ({ league }: { league: League }) => {
  if (league.hidden) return <></>

  return (
    <div key={league._id} className="card card-body bg-base-200 p-0 shadow-lg">
      <div className="p-2 md:p-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{league.name}</div>
          <div data-tip="Verified League" className="tooltip tooltip-accent text-purple-600">
            {league.verified && <VerifiedIcon />}
          </div>
        </div>

        <div className="mt-2 max-h-[85px] min-h-[85px] w-full overflow-y-auto text-accent">
          {league.description}
        </div>

        <div className="mb-4 text-lg font-semibold">Requirements</div>
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">MMR</div>
              <div className="text-lg">
                <Pill text={`${league.requirements['MMR']}+`} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">SR</div>
              <div className="text-lg">
                <Pill text={`${league.requirements['SR']}+`} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">Races</div>
              <div className="text-lg">
                <Pill text={`${league.requirements['races']}+`} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">Laps</div>
              <div className="text-lg">
                <Pill text={`${league.requirements['laps']}+`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full rounded-bl-lg rounded-br-lg bg-base-300 p-4">
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="text-md pb-2 font-semibold text-accent">Riders Joined</div>
            <div className="text-lg">{league.total_riders.toLocaleString()}</div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="text-md pb-2 font-semibold text-accent">League</div>
            <div className="text-lg">
              {league.closed ? (
                <button disabled={true} className="btn-outline btn-sm btn bg-base-200">
                  League CLosed
                </button>
              ) : (
                <Link
                  href={`/leagues/${league._id}`}
                  className="btn-outline btn-sm btn bg-base-200">
                  Go To League
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mockleagues = [
  {
    _id: '64270bf73bfe913f11c6c5d1',
    by: 'FF01100001013A65F1',
    logo: 'https://pepiti.com/img/league/logo/default.png',
    trophy: 'https://pepiti.com/img/league/trophy/default.png',
    name: 'Novice League',
    description: 'This is a NOVICE league, there are no requirements to enroll.',
    verified: true,
    hidden: false,
    closed: true,
    keep_bike_selection: false,
    keep_race_number: true,
    total_riders: 0,
    requirements: {
      MMR: 1000,
      SR: 1000,
      races: 1,
      laps: 1,
      records: 1,
    },
    races: [],
    riders: {},
  },
  {
    _id: '64270bf73bfe913f11c6c5d2',
    by: 'FF01100001013A65F2',
    logo: 'https://pepiti.com/img/league/logo/default.png',
    trophy: 'https://pepiti.com/img/league/trophy/default.png',
    name: 'Amateur League',
    description: 'This is a AMATEUR league, you must have moderate MMR and SR to enroll.',
    verified: true,
    hidden: false,
    closed: true,
    keep_bike_selection: true,
    keep_race_number: true,
    total_riders: 0,
    requirements: {
      MMR: 1500,
      SR: 1200,
      races: 20,
      laps: 100,
      records: 1,
    },
    races: [],
    riders: {},
  },
  {
    _id: '64270bf73bfe913f11c6c5d3',
    by: 'FF01100001013A65F3',
    logo: 'https://pepiti.com/img/league/logo/default.png',
    trophy: 'https://pepiti.com/img/league/trophy/default.png',
    name: 'Pro League',
    description: 'This is a PRO league, you must have very high MMR and SR to enroll.',
    verified: true,
    hidden: false,
    closed: true,
    keep_bike_selection: true,
    keep_race_number: true,
    total_riders: 0,
    requirements: {
      MMR: 2500,
      SR: 1500,
      races: 100,
      laps: 1000,
      records: 1,
    },
    races: [],
    riders: {},
  },
  {
    _id: '64270bf73bfe913f11c6c5d0',
    by: 'FF01100001013A65F0',
    logo: 'https://pepiti.com/img/league/logo/default.png',
    trophy: 'https://pepiti.com/img/league/trophy/default.png',
    name: 'Pepitis League',
    description: 'This is a fun league, we want to be competitive but have fun.',
    verified: false,
    hidden: false,
    closed: false,
    keep_bike_selection: true,
    keep_race_number: true,
    total_riders: 2,
    requirements: {
      MMR: 1000,
      SR: 1000,
      races: 1,
      laps: 1,
      records: 1,
    },
    races: [],
    riders: {},
  },
]
