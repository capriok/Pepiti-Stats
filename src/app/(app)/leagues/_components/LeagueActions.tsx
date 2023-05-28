'use client'

import Link from 'next/link'
import { leaveLeague } from '~/api/actions'
import { useToast, actions } from "~/components/toast"

export default function LeagueActions({ guid, leagueId, eligibility }) {
  const { pushToast } = useToast()
  const isJoined = eligibility.league_joined === true
  const isBanned = eligibility.not_banned !== true
  const isEligible = !isJoined && !isBanned

  return isJoined ? (
    <form
      action={(formData) =>
        leaveLeague(formData)
          .then(() => pushToast(actions.leaveLeague))
          .catch(pushToast)
      }
      className="flex w-fit"
    >
      <input name="leagueId" value={leagueId} readOnly className="hidden" />
      <button className="btn-outline btn-sm btn w-full text-error" disabled={false}>
        Leave League
      </button>
    </form>
  ) : (
    <Link href={`/leagues/${leagueId}/signup?guid=${guid}`}>
      <button className="btn-secondary btn-sm btn w-fit text-white" disabled={!isEligible}>
        Join League
      </button>
    </Link>
  )
}