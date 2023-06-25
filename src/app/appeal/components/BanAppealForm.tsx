"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { postBanAppeal } from "~/api/actions"
import { useUserContext } from "~/app/providers"
import Pill from "~/components/pills/Pill"
import { renderBannedBy } from "~/components/tables/BlacklistTable"
import { useToast, actions } from "~/components/toast"

interface Props {
  reason: string
}

const AppealLength = 100

export default function BanAppealForm({ reason }: Props) {
  const user = useUserContext()
  const router = useRouter()
  const { pushToast } = useToast()
  const [appeal, setAppeal] = useState("")

  if (!user.guid) return router.push("/signin")

  const submit = (formData) =>
    postBanAppeal(formData)
      .then(() => pushToast(actions.postRiderReport))
      .then(() => router.push(`/blacklists`))
      .catch(pushToast)

  const charactersCn = appeal.length >= AppealLength ? "text-green-500" : "text-red-500"

  const disabled = appeal.length < AppealLength
  const buttonCn = disabled ? "" : "bg-secondary rounded-lg py-2 font-semibold text-white"

  return (
    <div className="card card-body mx-auto mt-10 w-[500px]">
      <div className="flex flex-col justify-center align-middle">
        <form action={submit} className="form-control w-full">
          {/* User Guid */}
          <div className="mb-2 text-lg font-semibold">GUID</div>
          <input
            readOnly
            name="userGuid"
            value={user.guid}
            className="input-bordered input bg-base-200"
          />
          <br />

          {reason ? (
            <>
              {/* Ban Reason */}
              <label className="label mt-2 flex justify-between">
                <span className="label-text flex w-full items-center justify-between">
                  <div className="font-semibold">Ban Reason</div>
                  <Pill
                    text={reason.charAt(0).toUpperCase() + reason.slice(1)}
                    color={renderBannedBy(reason)}
                  />
                </span>
              </label>

              {/* Appeal */}
              <label className="label mt-2 flex justify-between">
                <span className="label-text">
                  <span className="text-red-500">* </span> Plead your ban appeal
                </span>
                <span className={`text-xs ${charactersCn}`}>
                  Required: {appeal.length} / {AppealLength}
                </span>
              </label>
              <textarea
                name="appeal"
                className="textarea-bordered textarea h-24 bg-base-200"
                onChange={(e) => setAppeal(e.target.value)}
              />

              <br />
              <button className={buttonCn} disabled={disabled} type="submit">
                Submit
              </button>
            </>
          ) : (
            <div className="flex justify-center text-secondary">You are not banned</div>
          )}
        </form>
      </div>
    </div>
  )
}
