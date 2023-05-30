"use client"

import { dismissAbuseRiderReport } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."

interface Props {
  reportId: string
  userId: string
  hackit?: boolean
}

export default function DismissAbuseRiderReport({ reportId, userId, hackit = false }: Props) {
  const { pushToast } = useToast()

  const submit = (formData) =>
    dismissAbuseRiderReport(formData)
      .then(() => pushToast(actions.dismissAbuseRiderReport))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)

  return (
    <Popover>
      <PopoverTrigger
        className="btn-outline btn-info btn-sm btn whitespace-nowrap border-info text-white"
        disabled={true}
      >
        Report Abuse
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="py-2 text-center text-sm text-accent">
          This will close the report and report the user for abuse
        </div>
        <form action={submit}>
          <button
            name="reportId"
            value={reportId}
            type="submit"
            className="btn-info btn-sm btn mt-2"
          >
            Dismiss with Abuse
          </button>
          <input readOnly={true} value={userId} className="hidden" />
        </form>
      </PopoverContent>
    </Popover>
  )
}
