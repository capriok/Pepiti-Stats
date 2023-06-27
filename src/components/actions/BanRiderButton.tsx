"use client"

import { useRef } from "react"
import { banRider } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."
import { Button } from "~/ui/Button"

interface Props {
  riderId: string
  name: string
  hackit?: boolean
}

export default function BanRiderButton({ riderId, name, hackit = false }: Props) {
  const reasonRef = useRef<HTMLInputElement>(null)
  const { pushToast } = useToast()

  const submit = (formData) =>
    banRider(formData)
      .then(() => pushToast(actions.banRider, name))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="error" className="w-full">
          Ban Rider
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center justify-center gap-4">
        <div>Please give reason</div>
        <form action={submit}>
          <input
            name="reason"
            ref={reasonRef}
            autoComplete="off"
            placeholder="Ramming, Racism, Retard..."
            className="input-bordered input input-sm w-full"
          />
          <Button variant="error" name="guid" value={riderId} type="submit" className="mt-4 w-full">
            Ban
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
