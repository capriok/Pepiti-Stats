"use client"

import { unbanRider } from "~/api/actions"
import { forceRefresh } from "."
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

export default function UnbanRiderDialog({ guid, name, reason, hackit = false }) {
  const { pushToast } = useToast()

  const submit = () => {
    const formData = new FormData()
    formData.append("guid", guid)

    return unbanRider(formData)
      .then(() => pushToast(actions.unbanRider, name))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>Unban Rider</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation</AlertDialogTitle>
          <div className="w-full text-left">
            <div className="flex flex-col text-[15px]">
              <div className="text-accent">GUID</div>
              <div>{guid}</div>
            </div>
            <div className="mt-2 flex flex-col text-[15px]">
              <div className="text-accent">Name</div>
              <div>{name}</div>
            </div>
            <div className="mt-2 flex flex-col text-[15px]">
              <div className="text-accent">Reason</div>
              <div>{reason}</div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="warning" onClick={submit}>
            Unban Rider
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
