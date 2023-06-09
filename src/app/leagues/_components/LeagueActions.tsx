"use client"

import { useRouter } from "next/navigation"
import LeaveLeagueButton from "~/components/actions/LeaveLeagueButton"
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
    <LeaveLeagueButton leagueId={league._id} name={league.name} />
  ) : (
    <Button
      variant="error"
      disabled={!isEligible}
      onClick={() => router.push(`/leagues/${league._id}/signup?guid=${rider._id}`)}
      className="w-full"
    >
      Join League
    </Button>
  )
}
