"use client"

import { unbanRider } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."

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
      <PopoverTrigger className="btn-outline btn-error btn-sm btn whitespace-nowrap border-error text-white">
        Unban Rider
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <form action={submit}>
          <button name="guid" value={riderId} type="submit" className="btn-error btn-sm btn mt-2">
            Unban
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
