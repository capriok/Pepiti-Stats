'use client'

import { joinLeagueRace, leaveLeagueRace } from '~/api/actions'
import { useToast, actions } from "~/components/toast"
import { checkRequirements } from "."

interface Props {
  raceId: string
  eligibility: LeagueRaceEligibility
  raceName: string
}

export default function LeagueRaceActions({ raceId, eligibility, raceName }: Props) {
  const { pushToast } = useToast()
  const meetsRequirements = checkRequirements(eligibility)
  const isJoinedLeague = eligibility.league_joined === true
  const isJoinedRace = eligibility.race_joined === true
  const isBanned = eligibility.not_banned !== true

  const isEligible = isJoinedLeague && !isJoinedRace && !isBanned && meetsRequirements

  return isJoinedRace ? (
    <form
      action={(formData) =>
        leaveLeagueRace(formData)
          .then(() => pushToast(actions.leaveLeagueRace, raceName))
          .catch(pushToast)
      }
    >
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-outline btn-sm btn w-full text-error" disabled={false}>
        Unregister
      </button>
    </form>
  ) : (
    <form
      action={(formData) =>
        joinLeagueRace(formData)
          .then(() => pushToast(actions.joinLeagueRace, raceName))
          .catch(pushToast)
      }
    >
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-secondary btn-sm btn w-full text-white" disabled={!isEligible}>
        Register
      </button>
    </form>
  )
}
