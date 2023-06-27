"use client"

import { leaveLeague } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { Button } from "~/ui/Button"

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
      <PopoverTrigger>
        <Button variant="error">Leave League</Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Confirm</div>
        <div className="py-2 text-center text-sm text-accent">
          This will remove you from the league
        </div>
        <form action={submit}>
          <Button variant="error" value={leagueId} name="leagueId" type="submit">
            Leave
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
