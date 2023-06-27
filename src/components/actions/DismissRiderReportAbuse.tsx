"use client"

import { dismissAbuseRiderReport } from "~/api/actions"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { useToast, actions } from "~/components/toast"
import { forceRefresh } from "."
import { Button } from "~/ui/Button"

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
      <PopoverTrigger disabled={true}>
        <Button variant="outline" className="w-full" disabled={true}>
          Report Abuse
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid place-items-center">
        <div>Please confirm</div>
        <div className="gap-2 py-2 text-center text-sm text-accent">
          This will close the report and report the user for abuse
        </div>
        <form action={submit}>
          <Button variant="info" name="reportId" value={reportId} type="submit">
            Dismiss with Abuse
          </Button>
          <input readOnly={true} value={userId} className="hidden" />
        </form>
      </PopoverContent>
    </Popover>
  )
}
