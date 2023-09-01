import GetAuthUser from "~/api"
import { GetConstantOEMBikes, GetConstantServers, GetLeague } from "~/api"
import LeagueSignupForm from "../../components/LeagueSignupForm"
import PageLayout from "~/components/PageLayout"

export const metadata = {
  title: "Pepiti | Leagues",
  description: "Compete in race leagues for real prizes and bragging rights",
}

export default async function Page({ params: { leagueId } }) {
  const user = await GetAuthUser()
  const league = await GetLeague(leagueId, user.token)
  const oems = await GetConstantOEMBikes(user.token)
  const servers = await GetConstantServers(user.token)

  return (
    <PageLayout
      width="app"
      header={{
        title: "League Signup",
      }}
    >
      <div className="mx-auto w-full md:w-[500px]">
        <div className="grid place-items-center">
          <LeagueSignupForm
            leagueId={leagueId}
            name={league.name}
            bikes={Object.keys(oems)
              .filter((key) => league.category.includes(key))
              .map((key) => ({ name: key, bikes: oems[key] }))}
            servers={servers.datacenters}
          />
        </div>
      </div>
    </PageLayout>
  )
}
