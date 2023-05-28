'use client'

import { useRouter } from "next/navigation"
import { leaveLeague } from "~/api/actions"
import { useToast, actions } from "~/components/toast"
import { checkRequirements } from "."

interface Props {
  guid: string
  leagueId: string
  eligibility: LeagueEligibility
  leagueName: string
}

export default function LeagueActions({ guid, leagueId, eligibility, leagueName }: Props) {
  const { pushToast } = useToast()
  const router = useRouter()
  const meetsRequirements = checkRequirements(eligibility)
  const isJoined = eligibility.league_joined === true
  const isBanned = eligibility.not_banned !== true

  const isEligible = !isJoined && !isBanned && meetsRequirements

  return isJoined ? (
    <form
      action={(formData) =>
        leaveLeague(formData)
          .then(() => pushToast(actions.leaveLeague, leagueName))
          .catch(pushToast)
      }
      className="flex w-fit"
    >
      <button
        name="leagueId"
        value={leagueId}
        disabled={false}
        className="btn-outline btn-sm btn w-full text-error"
      >
        Leave League
      </button>
    </form>
  ) : (
    <button
      disabled={!isEligible}
      onClick={() => router.push(`/leagues/${leagueId}/signup?guid=${guid}`)}
      className="btn-secondary btn-sm btn w-fit text-white"
    >
      Join League
    </button>
  )
}
