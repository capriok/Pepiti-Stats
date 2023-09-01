import GetAuthUser from "~/api"
import { GetLeagueRace, GetLeagueRaceEligibility } from "~/api"
import PageLayout from "~/components/PageLayout"
import LeagueRaceOverview from "../../components/LeagueRaceOverview"
import LeagueRaceActions from "../../components/LeagueRaceActions"

export const metadata = {
  title: "Pepiti | League Race",
  description: "Compete in race leagues for real prizes and bragging rights",
}

export default async function Page(props) {
  const {
    params: { raceId },
  } = props
  const user = await GetAuthUser()
  const race = await GetLeagueRace(raceId, user.token)
  const eligibility = await GetLeagueRaceEligibility(raceId, user.token)

  return (
    <PageLayout
      width="app"
      header={{
        backEnabled: true,
        title: "League Race",
        extra: <LeagueRaceActions race={race} eligibility={eligibility} />,
      }}
    >
      <LeagueRaceOverview user={user} race={race} eligibility={eligibility} />
    </PageLayout>
  )
}
