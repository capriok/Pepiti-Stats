"use client"

import { reopenRiderReport } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."

interface Props {
  reportId: string
  hackit?: boolean
}

export default function ReopenRiderReport({ reportId, hackit = false }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    reopenRiderReport(formData)
      .then(() => pushToast(actions.reopenRiderReport))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-warning btn-sm btn mb-2 whitespace-nowrap border-warning text-white">
        Reopen Report
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">This will reopen the report</div>
        <form action={submit}>
          <button
            name="reportId"
            value={reportId}
            type="submit"
            className="btn-warning btn-sm btn mt-2"
          >
            Reopen
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
