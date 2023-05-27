'use client'

import Link from 'next/link'
import { leaveLeague } from '~/api/actions'
import { useToast } from '~/hooks/toast'
import { ToastMessages, handleActionWithToast } from '~/utils/handleActionWithToast'

export default function LeagueActions({ guid, leagueId, eligibility }) {
  const { toast } = useToast()
  const isJoined = eligibility.league_joined === true
  const isBanned = eligibility.not_banned !== true
  const isEligible = !isJoined && !isBanned
  const leaveLeagueToastMessages: ToastMessages = {
    title: "Left League",
    msg: "You have successfully left this league."
  }

  return isJoined ? (
    <form action={(formData) => handleActionWithToast(leaveLeague(formData), leaveLeagueToastMessages, toast)} className="flex w-fit">
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
