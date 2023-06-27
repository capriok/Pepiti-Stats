import Link from "next/link"
import GetAuthUser from "~/api"
import { GetLeagueRace, GetLeagueRaceEligibility } from "~/api"
import PageLayout from "~/components/PageLayout"
import LeagueRaceOverview from "../../_components/LeagueRaceOverview"
import LeagueRaceActions from "../../_components/LeagueRaceActions"
import { Button } from "~/ui/Button"

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
        title: "League Race",
        extra: (
          <div className="flex gap-2">
            <Link href={`/leagues/${race.league_id}`}>
              <Button variant="outline">Go to League</Button>
            </Link>
            <LeagueRaceActions
              raceId={race._id}
              eligibility={eligibility}
              name={race.config.event.track}
            />
          </div>
        ),
      }}
    >
      <LeagueRaceOverview user={user} race={race} eligibility={eligibility} />
    </PageLayout>
  )
}
