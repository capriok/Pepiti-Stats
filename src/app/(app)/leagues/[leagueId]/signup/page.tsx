import { GetConstantOEMBikes, GetConstantServers, GetLeague } from "~/api"
import getAuthUser from "~/api/getAuthUser"
import PageHeader from "~/components/PageHeader"
import LeagueSignupForm from "../../_components/LeagueSignupForm"

export const metadata = {
  title: "Pepiti | Leagues",
  description: "Compete in race leagues for real prizes and bragging rights",
}

export default async function Page({ params: { leagueId } }) {
  const user = await getAuthUser()
  const league = await GetLeague(leagueId, user.token)
  const oems = await GetConstantOEMBikes(user.token)
  const servers = await GetConstantServers(user.token)

  return (
    <>
      <PageHeader title="League  Signup" />
      <div className="mx-auto w-full md:w-[500px]">
        <div className="grid place-items-center">
          <LeagueSignupForm
            leagueId={leagueId}
            name={league.name}
            bikes={Object.keys(oems).map((key) => ({ name: key, bikes: oems[key] }))}
            servers={servers.datacenters}
          />
        </div>
      </div>
    </>
  )
}
