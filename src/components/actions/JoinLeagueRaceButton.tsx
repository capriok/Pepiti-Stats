"use client"

import { joinLeagueRace } from "~/api/actions"
import { useToast, actions } from "~/components/toast"
import { Button } from "~/ui/Button"

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
      <Button
        variant="primary"
        name="raceId"
        value={raceId}
        type="submit"
        className="btn-primary btn-sm btn"
        disabled={!isEligible}
      >
        Register
      </Button>
    </form>
  )
}
