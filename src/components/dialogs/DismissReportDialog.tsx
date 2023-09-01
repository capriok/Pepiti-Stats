"use client"

import { forceRefresh } from "."
import { dismissRiderReport } from "~/api/actions"
import { actions, useToast } from "../toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/ui/AlertDialog"

export default function DismissReportDialog({
  reportId,
  date,
  event,
  user,
  rider,
  hackit = false,
}) {
  const { pushToast } = useToast()

  const submit = () => {
    const formData = new FormData()
    formData.append("reportId", reportId)

    console.log(reportId)

    return dismissRiderReport(formData)
      .then(() => pushToast(actions.dismissRiderReport))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>Dismiss Report</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation</AlertDialogTitle>
          <div className="w-full text-left">
            <div className="flex flex-col text-[15px]">
              <div className="text-accent">Date</div>
              <div>{date}</div>
            </div>
            <div className="mt-2 flex flex-col text-[15px]">
              <div className="text-accent">Event</div>
              <div>{event}</div>
            </div>
            <div className="mt-2 flex flex-col text-[15px]">
              <div className="text-accent">Report</div>
              <div className="capitalize">
                {user} <span className="lowercase">vs.</span> {rider}
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="warning" onClick={submit}>
            Dismiss Report
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
