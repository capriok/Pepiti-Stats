"use client"

import UnregisterLeagueRaceDialog from "~/components/dialogs/UnregisterLeagueRaceDialog"
import RegisterLeagueRaceDialog from "~/components/dialogs/RegisterLeagueRaceDialog"
import { checkRequirements } from "."

interface Props {
  race: LeagueRaceDetails
  eligibility: LeagueRaceEligibility
}

export default function LeagueRaceActions({ race, eligibility }: Props) {
  const meetsRequirements = checkRequirements(eligibility)

  const isJoinedLeague = eligibility.league_joined === true
  const isJoinedRace = eligibility.race_joined === true
  const isBanned = eligibility.not_banned !== true

  const isEligible = isJoinedLeague && !isJoinedRace && !isBanned && meetsRequirements

  return isJoinedRace ? (
    <UnregisterLeagueRaceDialog
      raceId={race._id}
      date={new Date(race.timestamp * 1000).toLocaleString()}
      track={race.config.event.track}
    />
  ) : (
    <RegisterLeagueRaceDialog
      raceId={race._id}
      isEligible={isEligible}
      date={new Date(race.timestamp * 1000).toLocaleString()}
      track={race.config.event.track}
    />
  )
}
