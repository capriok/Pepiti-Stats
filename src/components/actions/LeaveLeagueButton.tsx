"use client"

import { leaveLeague } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

interface Props {
  leagueId: string
  name: string
}

export default function LeaveLeagueButton({ leagueId, name }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    leaveLeague(formData)
      .then(() => pushToast(actions.leaveLeague, name))
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-error btn-sm btn whitespace-nowrap border-error text-white">
        Leave League
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Confirm</div>
        <div className="py-2 text-center text-sm text-accent">
          This will remove you from the league
        </div>
        <form action={submit}>
          <button
            name="leagueId"
            value={leagueId}
            type="submit"
            className="btn-error btn-sm btn mt-2"
          >
            Leave
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
