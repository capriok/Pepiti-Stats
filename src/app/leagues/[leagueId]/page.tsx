import { GetLeague, GetLeagueEligibility, GetRider } from "~/api"
import GetAuthUser from "~/api"
import LeagueOverview from "../_components/LeagueOverview"
import LeagueActions from "../_components/LeagueActions"
import PageLayout from "~/components/PageLayout"

export const metadata = {
  title: "Pepiti | League",
  description: "Compete in race leagues for real prizes and bragging rights",
}

export default async function Page({ params: { leagueId } }) {
  const user = await GetAuthUser()
  const rider = await GetRider(user.guid)
  const league = await GetLeague(leagueId, user.token)
  const host = await GetRider(league.by)
  const eligibility = await GetLeagueEligibility(leagueId, user.token)

  return (
    <PageLayout
      width="app"
      header={{
        title: "League",
        extra: <LeagueActions league={league} rider={rider} eligibility={eligibility} />,
      }}
    >
      <LeagueOverview
        user={user}
        rider={rider}
        league={league}
        host={host}
        eligibility={eligibility}
      />
    </PageLayout>
  )
}
