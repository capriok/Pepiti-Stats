"use client"

import { joinLeagueRace } from "~/api/actions"
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

export default function RegisterLeagueRaceDialog({ raceId, isEligible, date, track }) {
  const { pushToast } = useToast()

  const submit = () => {
    const formData = new FormData()
    formData.append("raceId", raceId)

    return joinLeagueRace(formData)
      .then(() => pushToast(actions.joinLeagueRace, track))
      .catch(pushToast)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>Register</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This will register you for the League Race</AlertDialogTitle>
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
          <AlertDialogAction variant="primary" onClick={submit} disabled={!isEligible}>
            Register
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
