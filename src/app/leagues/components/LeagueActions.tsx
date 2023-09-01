"use client"

import { useRouter } from "next/navigation"
import LeaveLeagueDialog from "~/components/dialogs/LeaveLeagueDialog"
import { Button } from "~/ui/Button"
import { checkRequirements } from "."

interface Props {
  league: League
  rider: RiderProfile
  eligibility: LeagueEligibility
}

export default function LeagueActions({ league, rider, eligibility }: Props) {
  const router = useRouter()
  const meetsRequirements = checkRequirements(eligibility)
  const isJoined = eligibility.league_joined === true
  const isBanned = eligibility.not_banned !== true

  const isEligible = !isJoined && !isBanned && meetsRequirements

  return isJoined ? (
    <LeaveLeagueDialog leagueId={league._id} name={league.name} />
  ) : (
    <Button
      disabled={!isEligible}
      onClick={() => router.push(`/leagues/${league._id}/signup?guid=${rider._id}`)}
      className="w-full"
    >
      Join League
    </Button>
  )
}
