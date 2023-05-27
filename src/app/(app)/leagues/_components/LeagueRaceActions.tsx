'use client'

import { joinLeagueRace, leaveLeagueRace } from '~/api/actions'
import { useToast } from '~/hooks/toast'
import { handleActionWithToast } from '~/utils/handleActionWithToast'

interface Props {
  raceId: string
  eligibility: LeagueRaceEligibility
}

export default function LeagueRaceActions({ raceId, eligibility }: Props) {
  const isJoinedLeague = eligibility.league_joined === true
  const isJoinedRace = eligibility.race_joined === true
  const isNotBanned = eligibility.not_banned === true
  const isEligible = !isJoinedRace && isNotBanned
  const { toast } = useToast()
  const joinToastMessages = {
    title: "Joined League Race",
    msg: "You have successfully joined the league race."
  }
  const leaveToastMessages = {
    title: "Left League Race",
    msg: "You have successfully left the league race."
  }

  return isEligible ? (
    <form action={(formData) => handleActionWithToast(joinLeagueRace(formData), joinToastMessages, toast)}>
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-secondary btn-sm btn w-full text-white" disabled={!isJoinedLeague}>
        Register
      </button>
    </form>
  ) : (
    <form action={(formData) => handleActionWithToast(leaveLeagueRace(formData), leaveToastMessages, toast)}>
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-outline btn-sm btn w-full text-error" disabled={false}>
        Unregister
      </button>
    </form>
  )
}
