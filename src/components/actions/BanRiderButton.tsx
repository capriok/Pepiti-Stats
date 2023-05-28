"use client"

import { useRef } from "react"
import { banRider } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

interface Props {
  guid: string
  name: string
}

export default function BanRiderButton({ guid, name }: Props) {
  const reasonRef = useRef<HTMLInputElement>(null)
  const { pushToast } = useToast()

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-error btn-sm btn mb-2 whitespace-nowrap border-error text-white">
        Ban Rider
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please give reason</div>
        <form
          action={(formData) =>
            banRider(formData)
              .then(() => pushToast(actions.banRider, name))
              .catch(pushToast)
          }
          className="mt-4 flex flex-col items-center justify-center gap-4"
        >
          <input
            ref={reasonRef}
            name="reason"
            autoComplete="off"
            placeholder="Ramming, Racism, Retard..."
            className="input-bordered input input-sm w-full"
          />
          <button type="submit" name="guid" value={guid} className="btn-error btn-sm btn w-full">
            Ban Rider
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
