'use client'

import { GetConstantOEMBikes, GetConstantServers } from "~/api"
import getAuthUser from "~/api/getAuthUser"
import InterceptingModal from "../../../InterceptingModal"
import LeagueSignupForm from "~/app/(app)/leagues/_components/LeagueSignupForm"

export const dynamic = "force-dynamic"

export default async function Page({ params: { leagueId } }) {
  const user = await getAuthUser()
  const oems = await GetConstantOEMBikes(user.token)
  const servers = await GetConstantServers(user.token)

  return (
    <InterceptingModal>
      <LeagueSignupForm
        leagueId={leagueId}
        bikes={Object.keys(oems).map((key) => ({ name: key, bikes: oems[key] }))}
        servers={servers}
      />
    </InterceptingModal>
  )
}
