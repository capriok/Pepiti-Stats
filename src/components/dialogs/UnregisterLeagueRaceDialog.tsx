"use client"

import { leaveLeagueRace } from "~/api/actions"
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

export default function UnregisterLeagueRaceDialog({ raceId, date, track }) {
  const { pushToast } = useToast()

  const submit = () => {
    const formData = new FormData()
    formData.append("raceId", raceId)

    return leaveLeagueRace(formData)
      .then(() => pushToast(actions.leaveLeagueRace, track))
      .catch(pushToast)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>Unregister</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This will unregister you from the League Race</AlertDialogTitle>
          <div className="w-full text-left">
            <div className="flex flex-col text-[15px]">
              <div className="text-accent">Date</div>
              <div>{date}</div>
            </div>
            <div className="mt-2 flex flex-col text-[15px]">
              <div className="text-accent">Track</div>
              <div>{track}</div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="warning" onClick={submit}>
            Unregister
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
