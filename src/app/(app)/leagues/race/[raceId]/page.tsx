import Link from 'next/link'
import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import LeagueRaceOverview from '../../_components/LeagueRaceOverview'

export const metadata = {
  title: 'Pepiti | League Race',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page({ params: { raceId } }) {
  const user = useAuthUser()
  const race = await Api.GetLeagueRace(raceId, user.token)

  return (
    <>
      <PageHeader
        title="League Race"
        extra={
          <div className="flex gap-2">
            <Link
              href={`/leagues/${race.league_id}`}
              className="btn-outline btn-sm btn bg-base-200">
              Go to League
            </Link>
            <ActionButton race={race} />
          </div>
        }
      />
      <LeagueRaceOverview race={race} />
    </>
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
        Join Race
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
        Leave Race
      </button>
    )
  }

  return (
    <div className="flex w-fit">
      <JoinRaceButton />
    </div>
  )
}
