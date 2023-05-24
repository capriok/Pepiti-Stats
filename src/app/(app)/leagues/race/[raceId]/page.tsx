import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import LeagueRaceOverview from '../../components/LeagueRaceOverview'

export const metadata = {
  title: 'Pepiti | League',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page({ params: { raceId } }) {
  const user = useAuthUser()
  const race = await Api.GetLeagueRace(raceId, user.token)

  return (
    <>
      <PageHeader title="League Race" extra={<RaceActions />} />
      <LeagueRaceOverview user={user} race={race} />
    </>
  )
}

const RaceActions = () => {
  return (
    <>
      <div className="btn-secondary btn-sm btn text-white">Join Race</div>
    </>
  )
}
