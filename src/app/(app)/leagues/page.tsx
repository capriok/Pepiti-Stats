import { GetAllLeagues } from '~/api'
import PageHeader from '~/components/PageHeader'
import LeagueList from './_components/LeagueList'

export const metadata = {
  title: 'Pepiti | Leagues',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page() {
  const leaguesData = await GetAllLeagues()

  return (
    <>
      <PageHeader title="Leagues" />
      <LeagueList leagues={leaguesData.leagues} />
    </>
  )
}
