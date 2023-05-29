"use client"

import { leaveLeagueRace } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

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
      <PopoverTrigger className="btn-outline btn-warning btn-sm btn mb-2 whitespace-nowrap border-warning text-white">
        Unregister
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">
          This will unregister you from the league race
        </div>
        <form action={submit}>
          <button
            name="raceId"
            value={raceId}
            type="submit"
            className="btn-warning btn-sm btn mt-2"
          >
            Unregister
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
