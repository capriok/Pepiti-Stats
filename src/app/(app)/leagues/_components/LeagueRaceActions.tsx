"use client"

import JoinLeagueRaceButton from "~/components/actions/JoinLeagueRaceButton"
import LeaveLeagueRaceButton from "~/components/actions/LeaveLeagueRaceButton"
import { checkRequirements } from "."

interface Props {
  eligibility: LeagueRaceEligibility
  raceId: string
  name: string
}

export default function LeagueRaceActions({ eligibility, raceId, name }: Props) {
  const meetsRequirements = checkRequirements(eligibility)

  const isJoinedLeague = eligibility.league_joined === true
  const isJoinedRace = eligibility.race_joined === true
  const isBanned = eligibility.not_banned !== true

  const isEligible = isJoinedLeague && !isJoinedRace && !isBanned && meetsRequirements

  return isJoinedRace ? (
    <LeaveLeagueRaceButton raceId={raceId} name={name} />
  ) : (
    <JoinLeagueRaceButton isEligible={isEligible} raceId={raceId} name={name} />
  )
}
