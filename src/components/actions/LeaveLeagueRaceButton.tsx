"use client"

import { leaveLeagueRace } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { Button } from "~/ui/Button"

interface Props {
  raceId: string
  name: string
}

export default function LeaveLeagueRaceButton({ raceId, name }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    leaveLeagueRace(formData)
      .then(() => pushToast(actions.leaveLeagueRace, name))
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="warning">Unregister</Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">
          This will unregister you from the league race
        </div>
        <form action={submit}>
          <Button variant="warning" name="raceId" value={raceId} type="submit">
            Unregister
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
