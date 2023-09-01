"use client"

import { leaveLeague } from "~/api/actions"
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

export default function LeaveLeagueDialog({ leagueId, name }) {
  const { pushToast } = useToast()

  const submit = () => {
    const formData = new FormData()
    formData.append("leagueId", leagueId)

    return leaveLeague(formData)
      .then(() => pushToast(actions.leaveLeague, name))
      .catch(pushToast)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>Leave League</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This will remove you from the League</AlertDialogTitle>
          <div className="w-full text-left">
            <div className="flex flex-col text-[15px]">
              <div className="text-accent">Name</div>
              <div>{name}</div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="warning" onClick={submit}>
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
