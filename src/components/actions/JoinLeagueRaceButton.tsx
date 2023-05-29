"use client"

import { joinLeagueRace } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

interface Props {
  isEligible: boolean
  raceId: string
  name: string
}

export default function JoinLeagueRaceButton({ isEligible, raceId, name }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    joinLeagueRace(formData)
      .then(() => pushToast(actions.joinLeagueRace, name))
      .catch(pushToast)

  return (
    <form action={submit}>
      <button
        name="raceId"
        value={raceId}
        type="submit"
        className="btn-secondary btn-sm btn"
        disabled={!isEligible}
      >
        Register
      </button>
    </form>
  )
}
