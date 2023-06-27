"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLeagueContext } from "./LeagueOverview"
import { GetLeagueRaceEligibility } from "~/api"
import Pill from "~/components/pills/Pill"
import { leagueRaceStatusMap } from "."
import Spinner from "~/components/Spinner"
import { Button } from "~/ui/Button"

interface Props {
  race: LeagueRace
}

interface RaceEligibility {
  not_banned: boolean
  league_joined: boolean
  MMR: boolean
  SR: boolean
  races: boolean
  laps: boolean
  records: boolean
  race_joined: boolean
}

export default function LeagueRaceCard({ race }: Props) {
  const { user, eligibility: leagueEligibility } = useLeagueContext()

  // ! We should use useSWR here
  // ? if not we will have to fetch this at page load for all races which is not ideal
  //   ? further, we should not be fetching for these actions if the race card itself is not up next in the series
  // ? this should work but token does not make it to the request
  // ? not sure whats missing here?
  // const { data, error, isLoading } = useSWR(
  //   `/race/${race._id}/check`,
  //   (url) => fetcherWithToken(url, token)
  // )

  // const raceEligibility = data

  // ! For now, we will just use the following
  const [eligibilityLoading, setEligibilityLoading] = useState(true)
  const [raceEligibility, setRaceEligibility] = useState({} as RaceEligibility)

  useEffect(() => {
    GetLeagueRaceEligibility(race._id, user.token).then((res) => {
      setEligibilityLoading(false)
      setRaceEligibility(res)
    })
  }, [user, race])

  const isInLeague = leagueEligibility.league_joined === true
  const isInRace = raceEligibility.race_joined === true

  return (
    <div className="card card-body overflow-hidden rounded-lg border border-accent/40 bg-base-200 p-0 shadow-md">
      <RaceCardBanner status={race.status} isInRace={isInRace} loading={eligibilityLoading} />

      <RaceCardContent race={race} />

      <RaceCardActions race={race} isInLeague={isInLeague} loading={eligibilityLoading} />
    </div>
  )
}

const RaceCardBanner = ({
  status,
  isInRace,
  loading,
}: {
  status: number
  isInRace: boolean
  loading: boolean
}) => {
  return isInRace ? (
    <div className="bg-primary/80">
      <div className="flex justify-center py-2 text-white">You are Registered</div>
    </div>
  ) : (
    <div className={!loading ? leagueRaceStatusMap[status].color : "bg-accent"}>
      <div className="flex justify-center py-2 text-white">
        {!loading ? leagueRaceStatusMap[status].text : <div className="opacity-0">Loading</div>}
      </div>
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

const RaceCardActions = ({
  race,
  isInLeague,
  loading,
}: {
  race: LeagueRace
  isInLeague: boolean
  loading: boolean
}) => {
  const router = useRouter()

  return (
    <div className="w-full gap-2 bg-base-300 p-4">
      {loading ? (
        <Button variant="outline" className="w-full" disabled={true}>
          <Spinner />
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={!isInLeague}
          onClick={() => router.push(`/leagues/race/${race._id}`)}
          className="w-full"
        >
          Go To Race
        </Button>
      )}
    </div>
  )
}
