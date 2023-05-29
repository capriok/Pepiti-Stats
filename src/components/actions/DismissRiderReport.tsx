"use client"

import { dismissRiderReport } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"

interface Props {
  reportId: string
}

export default function DismissRiderReport({ reportId }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    dismissRiderReport(formData)
      .then(() => pushToast(actions.dismissRiderReport))
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger className="btn-outline btn-warning btn-sm btn mb-2 whitespace-nowrap border-warning text-white">
        Dismiss Report
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">This will close the report</div>
        <form action={submit}>
          <button
            name="reportId"
            value={reportId}
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
