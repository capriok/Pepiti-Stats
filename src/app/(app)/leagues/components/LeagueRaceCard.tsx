'use client'

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { privateFetcher } from '~/api'
import { Pill } from '~/components/pills/Pill'
import { useUserContext } from './LeagueOverview'

interface Props {
  race: LeagueRace
}

export default function LeagueRaceCard({  race }: Props) {
  const user = useUserContext()

  // const { data, isLoading } = useSWR(`/race/${race._id}/check`, () =>
  //   privateFetcher(`/race/${race._id}/check`, user.token)
  // )
  // console.log(data)

  // const eligibility = isLoading
  //   ? false
  //   : Object.keys(data)
  //       .filter((key) => key !== 'race_joined')
  //       .every((key) => data[key] === true)
  // console.log(eligibility)

  return (
    <div className="card card-body bg-base-200 p-0">
      <div className="overflow-hidden rounded-lg rounded-bl-none rounded-br-none">
        <RegistrationStatus status={race.status} />
      </div>

      <div className="p-4 pt-0">
        <div className="my-4 grid place-items-center md:my-10">
          <Image
            src="/assets/brand/SVGs/icon-V2.svg"
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
        <div className="w-full">
          <Link
            href={`/leagues/race/${race._id}`}
            className=" btn-outline btn-sm btn flex justify-center ">
            Go To Enrollment
          </Link>
        </div>
      </div>
    </div>
  )
}

const ActionButton = ({ race }) => {
  const registrationOpen = race.status === 0

  const JoinRaceButton = () => {
    return (
      <button
        className="btn-secondary btn-sm btn w-full text-white"
        // onClick={joinRace}
        // disabled={!registrationOpen}
        // disabled={!isEligibleToRace || !registrationOpen}
      >
        Join
      </button>
    )
  }

  const LeaveRaceButton = () => {
    return (
      <button
        className="btn-outline btn-sm btn w-full text-error"
        // onClick={leaveRace}
        // disabled={!registrationOpen}
        // disabled={!isEligibleToRace || !registrationOpen}
      >
        Leave
      </button>
    )
  }

  return (
    <>
      <JoinRaceButton />
    </>
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
