'use client'

import Link from 'next/link'
import { joinLeague } from '~/api/actions'

export default function LeagueActions({ guid, leagueId, eligibility }) {
  const isJoined = eligibility.league_joined === true
  const isBanned = eligibility.not_banned !== true
  const isEligible = !isJoined && !isBanned

  return isJoined ? (
    <form action={joinLeague} className="flex w-fit">
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
