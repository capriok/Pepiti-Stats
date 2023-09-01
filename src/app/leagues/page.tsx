import { GetAllLeagues } from "~/api"
import PageLayout from "~/components/PageLayout"
import LeagueList from "./components/LeagueList"

export const metadata = {
  title: "Pepiti | Leagues",
  description: "Compete in race leagues for real prizes and profile accolades",
}

export default async function Page() {
  const leaguesData = await GetAllLeagues()

  return (
    <PageLayout
      width="app"
      header={{
        backEnabled: true,
        title: "Leagues",
      }}
    >
      <LeagueList leagues={leaguesData.leagues} />
    </PageLayout>
  )
}
