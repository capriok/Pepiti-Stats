"use client"

import { unbanRider } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."
import { Button } from "~/ui/Button"

interface Props {
  riderId: string
  name: string
  hackit?: boolean
}

export default function UnbanRiderButton({ riderId, name, hackit = false }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    unbanRider(formData)
      .then(() => pushToast(actions.unbanRider, name))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="error">Unban Rider</Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center gap-2">
        <div>Please confirm</div>
        <form action={submit}>
          <Button variant="error" name="guid" value={riderId} type="submit">
            Unban
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
