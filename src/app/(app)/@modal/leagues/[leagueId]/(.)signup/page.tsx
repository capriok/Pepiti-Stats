import { GetConstantOEMBikes, GetConstantServers, GetLeague } from "~/api"
import GetAuthUser from "~/api"
import InterceptingModal from "../../../InterceptingModal"
import LeagueSignupForm from "~/app/(app)/leagues/_components/LeagueSignupForm"

export const dynamic = "force-dynamic"

export default async function Page({ params: { leagueId } }) {
  const user = await GetAuthUser()
  const league = await GetLeague(leagueId, user.token)
  const oems = await GetConstantOEMBikes(user.token)
  const servers = await GetConstantServers(user.token)

  return (
    <InterceptingModal>
      <LeagueSignupForm
        leagueId={leagueId}
        name={league.name}
        bikes={Object.keys(oems)
          .filter((key) => league.category.includes(key))
          .map((key) => ({ name: key, bikes: oems[key] }))}
        servers={servers.datacenters}
      />
    </InterceptingModal>
  )
}
