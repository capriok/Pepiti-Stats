"use client"

import { unbanRider } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

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
      .then(() => hackit && hack())
      .catch(pushToast)

  function hack() {
    // ? This is a hack to refresh the page at /blacklists after the action
    // ? The server action works but does want to revalidatePath.. there?
    setTimeout(() => {
      if (typeof window !== "undefined") window.location.reload()
    }, 1500)
  }

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-sm btn mb-2">Unban Rider</PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <form action={submit}>
          <button
            name="guid"
            value={riderId}
            type="submit"
            className="btn-error btn-sm btn mt-2"
          >
            Unban
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
