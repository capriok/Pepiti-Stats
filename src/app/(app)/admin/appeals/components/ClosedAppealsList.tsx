"use client"

import { useState } from "react"

interface Props {
  appeals: Array<BanAppeal>
}

export default function ClosedAppealsList({ appeals }: Props) {
  console.log("%cAdmin Appeals", "color: steelblue", { appeals })

  const [openAppeal, setOpenAppeal] = useState({} as BanAppeal)

  if (!appeals.length)
    return <div className="card card-body mt-4 bg-base-200 text-center">No Results</div>

  return (
    <>
      {appeals.map((appeal) => {
        const appealActive = appeal._id === openAppeal._id

        return (
          <div key={appeal._id} className="card bg-base-200 p-4 md:p-8">
            <div className="flex w-full justify-between">
              <div>
                <div className="flex align-middle text-2xl">{appeal.by.name}</div>
                <div className="text-md mt-2 flex align-middle text-accent">{appeal.by._id}</div>
              </div>
              <div className="relative">
                {!appealActive && <IdleAppealControls open={() => setOpenAppeal(appeal)} />}
              </div>
            </div>
            <div className="w-full">
              <AppealContent appeal={appeal} active={appealActive} />
            </div>
          </div>
        )
      })}
    </>
  )
}

const IdleAppealControls = ({ open }) => {
  return (
    <div className="flex w-fit flex-col justify-center align-middle">
      <button className="btn-outline btn-ghost btn-sm btn" onClick={open}>
        Review
      </button>
    </div>
  )
}

const AppealContent = ({ appeal, active }) =>
  active ? <ActiveAppealContent appeal={appeal} /> : <></>

const ActiveAppealContent = ({ appeal }) => {
  return (
    <>
      <div className="mt-4 flex flex-col">
        <div className="mt-2">
          <div className="mb-2 text-lg font-semibold">Appeal</div>
          <div className="indent-4 text-accent">{appeal.appeal}</div>
        </div>
      </div>
    </>
  )
}
