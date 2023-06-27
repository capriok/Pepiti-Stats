"use client"

import { dismissBanAppeal } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."
import { Button } from "~/ui/Button"

interface Props {
  appealId: string
  hackit?: boolean
}

export default function DismissBanAppeal({ appealId, hackit = false }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    dismissBanAppeal(formData)
      .then(() => pushToast(actions.dismissRiderAppeal))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="warning" className="w-full">
          Dismiss Appeal
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center gap-2">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">This will close the appeal</div>
        <form action={submit}>
          <Button variant="warning" name="appealId" value={appealId} type="submit">
            Dismiss
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
