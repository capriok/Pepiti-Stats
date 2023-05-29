import { GetConstantOEMBikes, GetConstantServers, GetLeague } from "~/api"
import getAuthUser from "~/api/getAuthUser"
import InterceptingModal from "../../../InterceptingModal"
import LeagueSignupForm from "~/app/(app)/leagues/_components/LeagueSignupForm"

export const dynamic = "force-dynamic"

export default async function Page({ params: { leagueId } }) {
  const user = await getAuthUser()
  const league = await GetLeague(leagueId, user.token)
  const oems = await GetConstantOEMBikes(user.token)
  const servers = await GetConstantServers(user.token)

  return (
    <InterceptingModal>
      <LeagueSignupForm
        leagueId={leagueId}
        name={league.name}
        bikes={Object.keys(oems).map((key) => ({ name: key, bikes: oems[key] }))}
        servers={servers.datacenters}
      />
    </InterceptingModal>
  )
}
