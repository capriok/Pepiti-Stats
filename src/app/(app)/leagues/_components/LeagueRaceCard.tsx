'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Pill from '~/components/pills/Pill'
import { leagueRaceStatusMap } from "."
import { useLeagueContext } from "./LeagueOverview"

interface Props {
  race: LeagueRace
}

export default function LeagueRaceCard({ race }: Props) {
  const { user, eligibility: leagueEligibility } = useLeagueContext()

  // ! In order to show the correct card state we need this to work
  // ? Used for Signup button and RegistrationBanner Status
  // ? if not we will have to fetch this at page load for all races which is not ideal
  // ? further, we should not be fetching for these actions if the race card itself is not up next in the series
  // const { data, error, isLoading } = useSWR(
  //   [`/race/${race._id}/check`, user.token],
  //   ([url, token]) => fetcherWithToken(url, token) // ? ok but gets cors errs..
  // )

  // if (error) return <center>Error</center>
  // if (isLoading) return <Spinner />
  // const raceEligibility = data

  // ! For now, we will just use this static eligibility
  const raceEligibility = {
    race_joined: false,
  }

  const isInLeague = leagueEligibility.league_joined === true
  const isInRace = raceEligibility.race_joined === true

  return (
    <div className="card card-body bg-base-200 p-0">
      <RaceCardBanner status={race.status} isInRace={isInRace} />

      <RaceCardContent race={race} />

      <RaceCardActions race={race} isInLeague={isInLeague} />
    </div>
  )
}

const RaceCardBanner = ({ status, isInRace }: { status: number; isInRace: boolean }) => {
  return (
    <div className="overflow-hidden rounded-lg rounded-bl-none rounded-br-none">
      {isInRace ? (
        <div className="bg-accent">
          <div className="flex justify-center py-2 text-white">You are Registered</div>
        </div>
      ) : (
        <div className={leagueRaceStatusMap[status].color}>
          <div className="flex justify-center py-2 text-white">
            {leagueRaceStatusMap[status].text}
          </div>
        </div>
      )}
    </div>
  )
}

const RaceCardContent = ({ race }: { race: LeagueRace }) => (
  <div className="p-4 pt-0">
    <div className="my-4 grid place-items-center md:my-8">
      <Image
        src="/assets/brand/pepiti-logo.svg"
        alt="pepiti-brand"
        width={100}
        height={100}
        priority={true}
      />
    </div>

    <div className="mt-2">{race.config.event.track}</div>
    <div className="text-sm text-accent">{new Date(race.timestamp * 1000).toLocaleString()}</div>

    <div className="mt-4 text-accent">Categories</div>
    <div className="my-4 flex w-full flex-wrap justify-center gap-2">
      {race.config.event.category.map((cat) => {
        return <Pill key={cat} text={cat} />
      })}
    </div>

    <div className="mt-4 flex items-center gap-2">
      <div className="text-accent">Riders Joined: </div>
      <div className="font-semibold">{race.total_riders}</div>
    </div>
  </div>
)

const RaceCardActions = ({ race, isInLeague }: { race: LeagueRace; isInLeague: boolean }) => {
  const router = useRouter()

  return (
    <div className="w-full gap-2 rounded-lg rounded-tl-none rounded-tr-none bg-base-300 p-4">
      <button
        className="btn-outline btn-sm btn w-full bg-base-200"
        disabled={!isInLeague}
        onClick={() => router.push(`/leagues/race/${race._id}`)}
      >
        Go To Race
      </button>
    </div>
  )
}
