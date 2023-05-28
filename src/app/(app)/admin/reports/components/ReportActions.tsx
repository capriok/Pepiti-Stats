"use client"

import { dismissReport } from "~/api/actions"
import BanRiderButton from "~/components/actions/BanRiderButton"
import { actions, useToast } from "~/components/toast"

interface Props {
  reportId: string
  riderGuid: string
  riderName: string
}

export default function ReportActions({ reportId, riderGuid, riderName }: Props) {
  const { pushToast } = useToast()

  return (
    <div className="absolute right-0 flex w-fit flex-col justify-center gap-2 align-middle">
      <BanRiderButton guid={riderGuid} name={riderName} />
      <form
        action={(formData) =>
          dismissReport(formData)
            .then(() => pushToast(actions.dismissReport))
            .catch(pushToast)
        }
      >
        <button
          className="btn-outline btn-warning btn-sm btn w-full"
          type="submit"
          name="reportId"
          value={reportId}
        >
          Dismiss
        </button>
      </form>

      {/* // ? DismissWithAbuse for the future
       <form
        action={(formData) =>
          dismissReportWithAbuse(formData)
            .then(() => pushToast(actions.dismissReportWithAbuse))
            .catch(pushToast)
        }
      >
        <input type="hidden" name="reportId" value={reportId} />
        <button className="btn-outline btn-sm btn w-full" type="submit">
          Abuse
        </button>
      </form> */}
    </div>
  )
}
