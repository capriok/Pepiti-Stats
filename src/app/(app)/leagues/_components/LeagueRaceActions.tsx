'use client'

import { joinLeagueRace, leaveLeagueRace } from '~/api/actions'
import { useToast, actions } from "~/components/toast"

interface Props {
  raceId: string
  eligibility: LeagueRaceEligibility
}

export default function LeagueRaceActions({ raceId, eligibility }: Props) {
  const isJoinedLeague = eligibility.league_joined === true
  const isJoinedRace = eligibility.race_joined === true
  const isNotBanned = eligibility.not_banned === true
  const isEligible = !isJoinedRace && isNotBanned
  const { pushToast } = useToast()

  return isEligible ? (
    <form
      action={(formData) =>
        joinLeagueRace(formData)
          .then(() => pushToast(actions.joinLeagueRace))
          .catch(pushToast)
      }
    >
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-secondary btn-sm btn w-full text-white" disabled={!isJoinedLeague}>
        Register
      </button>
    </form>
  ) : (
    <form
      action={(formData) =>
        leaveLeagueRace(formData)
          .then(() => pushToast(actions.leaveLeagueRace))
          .catch(pushToast)
      }
    >
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-outline btn-sm btn w-full text-error" disabled={false}>
        Unregister
      </button>
    </form>
  )
}
