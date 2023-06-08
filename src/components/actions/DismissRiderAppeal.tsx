"use client"

import { dismissRiderAppeal } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."

interface Props {
  appealId: string
  hackit?: boolean
}

export default function DismissRiderAppeal({ appealId, hackit = false }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    dismissRiderAppeal(formData)
      .then(() => pushToast(actions.dismissRiderAppeal))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-warning btn-sm btn whitespace-nowrap border-warning text-white">
        Dismiss Appeal
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">This will close the appeal</div>
        <form action={submit}>
          <button
            name="appealId"
            value={appealId}
            type="submit"
            className="btn-warning btn-sm btn mt-2"
          >
            Dismiss
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
