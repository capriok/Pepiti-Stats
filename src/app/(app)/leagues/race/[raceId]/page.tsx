import { GetLeagueRace, GetLeagueRaceEligibility } from '~/api'
import Link from 'next/link'
import PageHeader from '~/components/PageHeader'
import getAuthUser from '~/api/getAuthUser'
import LeagueRaceOverview from '../../_components/LeagueRaceOverview'
import LeagueRaceActions from '../../_components/LeagueRaceActions'

export const metadata = {
  title: 'Pepiti | League Race',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page(props) {
  const {
    params: { raceId },
  } = props
  const user = await getAuthUser()
  const race = await GetLeagueRace(raceId, user.token)
  const eligibility = await GetLeagueRaceEligibility(raceId, user.token)

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
            <LeagueRaceActions raceId={race._id} eligibility={eligibility} raceName={race.config.event.track} />
          </div>
        }
      />
      <LeagueRaceOverview user={user} race={race} eligibility={eligibility} />
    </>
  )
}
