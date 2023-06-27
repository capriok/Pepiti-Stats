"use client"

import { dismissRiderReport } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."
import { Button } from "~/ui/Button"

interface Props {
  reportId: string
  hackit?: boolean
}

export default function DismissRiderReport({ reportId, hackit = false }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    dismissRiderReport(formData)
      .then(() => pushToast(actions.dismissRiderReport))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="w-full">
          Dismiss Report
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center gap-2">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">This will close the report</div>
        <form action={submit}>
          <Button variant="warning" name="reportId" value={reportId} type="submit">
            Dismiss
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
