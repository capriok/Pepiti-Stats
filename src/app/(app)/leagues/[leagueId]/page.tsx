import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import getAuthUser from '~/api/getAuthUser'
import LeagueOverview from '../_components/LeagueOverview'

export const metadata = {
  title: 'Pepiti | League',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page({ params: { leagueId } }) {
  const user = getAuthUser()
  const rider = await Api.GetRider(user.guid)
  const league = await Api.GetLeague(leagueId, user.token)
  const host = await Api.GetRider(league.by)
  const eligibility = await Api.GetLeagueEligibility(leagueId, user.token)

  return (
    <>
      <PageHeader title="League" extra={<LeagueActions />} />
      <LeagueOverview rider={rider} league={league} host={host} eligibility={eligibility} />
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
