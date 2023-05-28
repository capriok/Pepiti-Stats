"use client"

import { unbanRider } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

interface Props {
  guid: string
  name: string
  hackit?: boolean
}

export default function UnbanRiderButton({ guid, name, hackit = false }: Props) {
  const { pushToast } = useToast()

  function hack() {
    // ? This is a hack to refresh the page at /blacklists after the action
    // ? The server action works but does want to revalidatePath.. there?
    setTimeout(() => {
      if (typeof window !== "undefined") window.location.reload()
    }, 1500)
  }

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-sm btn mb-2">Unban</PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm this action</div>
        <form
          action={(formData) =>
            unbanRider(formData)
              .then(() => {
                pushToast(actions.unbanRider, name)
                hackit && hack()
              })
              .catch(pushToast)
          }
        >
          <button
            type="submit"
            name="guid"
            value={guid}
            className="btn-outline btn-error btn-sm btn mt-2"
          >
            Unban
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
