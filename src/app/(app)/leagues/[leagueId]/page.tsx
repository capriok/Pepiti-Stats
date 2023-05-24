import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import LeagueOverview from '../components/LeagueOverview'

export const metadata = {
  title: 'Pepiti | League',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page({ params: { leagueId } }) {
  const user = useAuthUser()
  const rider = await Api.GetRider(user.guid)
  const league = await Api.GetLeague(leagueId, user.token)
  const host = await Api.GetRider(league.by)
  const eligibility = await Api.GetLeagueEligibility(leagueId, user.token)

  return (
    <>
      <PageHeader title="League" extra={<LeagueActions />} />
      <LeagueOverview
        user={user}
        rider={rider}
        league={league}
        host={host}
        eligibility={eligibility}
      />
    </>
  )
}

const LeagueActions = () => {
  return (
    <>
      <div className="btn-secondary btn-sm btn text-white">Join League</div>
    </>
  )
}
