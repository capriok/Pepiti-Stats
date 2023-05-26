'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Pill from '~/components/pills/Pill'
import { useLeagueContext } from './LeagueOverview'

interface Props {
  race: LeagueRaceCard
}

export default function LeagueRaceCard({ race }: Props) {
  const { user, eligibility } = useLeagueContext()

  return (
    <div className="card card-body bg-base-200 p-0">
      <div className="overflow-hidden rounded-lg rounded-bl-none rounded-br-none">
        <RegistrationStatus status={race.status} />
      </div>

      <div className="p-4 pt-0">
        <div className="my-4 grid place-items-center md:my-10">
          <Image
            src="/assets/brand/pepiti-logo.svg"
            alt="pepiti-brand"
            width={75}
            height={75}
            priority={true}
          />
        </div>

        <div className="mt-2">{race.config.event.track}</div>
        <div className="text-sm text-accent">
          {new Date(race.timestamp * 1000).toLocaleString()}
        </div>

        <div className="mt-4 text-accent">Categories</div>
        <div className="my-4 flex w-full flex-wrap justify-center gap-2">
          {race.config.event.category.map((cat) => {
            return <Pill key={cat} text={cat} />
          })}
        </div>

        <div className=" mt-4 text-accent">Riders Joined</div>
        <div className="font-semibold">{race.total_riders}</div>
      </div>
      <div className="w-full gap-2 rounded-lg rounded-tl-none rounded-tr-none bg-base-300 p-4">
        <LeaguesRaceCardActions race={race} user={user} eligibility={eligibility} />
      </div>
    </div>
  )
}

const LeaguesRaceCardActions = ({ user, race, eligibility }) => {
  const router = useRouter()

  // ! In order to show the correct button we need this to work
  // ? if not we will have to fetch this at page load for all races which is not ideal
  // ? further, we should not be fetching for these actions if the race card itself is not up next in the series
  // const { data, error, isLoading } = useSWR(
  //   [`/race/${race._id}/check`, user.token],
  //   ([url, token]) => fetcherWithToken(url, token) // ? ok but gets cors errs..
  // )

  // if (error) return <center>Error</center>
  // if (isLoading) return <Spinner />

  const isInLeague = eligibility.league_joined === true

  return (
    <button
      className="btn-outline btn-sm btn w-full bg-base-200"
      disabled={!isInLeague}
      onClick={() => router.push(`/leagues/race/${race._id}`)}>
      Signup
    </button>
  )
}

const RegistrationStatus = ({ status }) => {
  const statusMap = {
    0: { text: 'Registration Open', color: 'bg-secondary/80' },
    1: { text: 'Race in Progress', color: 'bg-orange-500/80' },
    2: { text: 'Race Finished', color: 'bg-red-500/80' },
  }

  return (
    <div className={statusMap[status].color}>
      <div className="flex justify-center py-2 text-white">{statusMap[status].text}</div>
    </div>
  )
}
