'use client'

import { joinLeagueRace, leaveLeagueRace } from '~/api/actions'

export default function LeagueRaceActions({ raceId, eligibility }) {
  const isJoinedLeague = eligibility.league_joined === true
  const isJoinedRace = eligibility.race_joined === true
  const isNotBanned = eligibility.not_banned === true
  const isEligible = !isJoinedRace && isNotBanned

  return isEligible ? (
    <form action={joinLeagueRace}>
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-secondary btn-sm btn w-full text-white" disabled={!isJoinedLeague}>
        Join Race
      </button>
    </form>
  ) : (
    <form action={leaveLeagueRace}>
      <input type="hidden" name="raceId" value={raceId} />
      <button className="btn-outline btn-sm btn w-full text-error" disabled={false}>
        Leave Race
      </button>
    </form>
  )
}
