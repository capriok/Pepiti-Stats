'use client'

import { unbanRider } from '~/api/actions'
import { Popover, PopoverContent, PopoverTrigger } from '~/ui/Popover'

interface Props {
  guid: string
}

export default function UnbanRiderButton({ guid }: Props) {
  function doThings(data) {
    unbanRider(data)

    // ? This is a hack to refresh the page after the request is sent
    // ? The server action works but does not revalidatepath or something else?
    setTimeout(() => {
      if (typeof window !== 'undefined') window.location.reload()
    }, 1000)
  }

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-sm btn mb-2">Unban</PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm this action</div>
        <form action={doThings}>
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
