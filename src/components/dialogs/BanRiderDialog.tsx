"use client"

import { useState } from "react"
import { banRider } from "~/api/actions"
import { forceRefresh } from "."
import { actions, useToast } from "../toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/ui/AlertDialog"

export default function BanRiderDialog({ guid, name, hackit = false }) {
  const { pushToast } = useToast()
  const [reason, setReason] = useState("")

  const submit = () => {
    const formData = new FormData()
    formData.append("guid", guid)
    formData.append("reason", reason)

    return banRider(formData)
      .then(() => pushToast(actions.banRider, name))
      .then(() => hackit && forceRefresh())
      .catch(pushToast)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>Ban Rider</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmation</AlertDialogTitle>
          <div className="w-full text-left">
            <div className="mt-2 flex flex-col text-[15px]">
              <div className="text-accent">GUID</div>
              <div>{guid}</div>
            </div>
            <div className="flex flex-col text-[15px]">
              <div className="text-accent">Name</div>
              <div>{name}</div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <span className="text-accent">Give Reason</span>
          <input
            name="reason"
            onChange={(e) => setReason(e.target.value)}
            autoComplete="off"
            placeholder="Rammer, Cutting, Racism..."
            className="input-bordered input input-sm mt-2 w-full"
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="error" onClick={submit} disabled={reason.length < 3}>
            Ban Rider
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
