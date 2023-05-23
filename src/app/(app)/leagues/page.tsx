import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import LeagueSearch from '~/components/searches/LeagueSearch'
import LeagueList from './components/LeagueList'

export const metadata = {
  title: 'Pepiti | Leagues',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page() {
  const leaguesData = await Api.GetAllLeagues()
  console.log(leaguesData)

  return (
    <>
      <PageHeader title="Leagues" extra={<LeagueSearch />} />
      <LeagueList leagues={leaguesData.leagues} />
    </>
  )
}
