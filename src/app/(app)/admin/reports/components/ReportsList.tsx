'use client'

import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  reports: Array<RiderReport>
}

export default function ReportsList({ reports }: Props) {
  const [openId, setOpenId] = useState(null)

  const handleIdleControlsClick = (id) => {
    setOpenId(id)
  }

  return (
    <>
      {/* {reports.map((r) => {
        const reportActive = r.reportId === openId
        return (
          <div key={r.plaintiff.id} className="card card-body my-4 w-full bg-base-200">
            <div className="flex w-full justify-between">
              <div className="flex align-middle text-2xl">
                {r.plaintiff.name} <ArrowRightIcon className="mx-4 mt-1" />
                {r.defendant.name}
              </div>
              <div className="relative">
                <ReportControls
                  active={reportActive}
                  open={() => handleIdleControlsClick(r.reportId)}
                  close={() => handleIdleControlsClick(null)}
                />
              </div>
            </div>
            <div className="w-full">
              <ReportContent r={r} active={reportActive} />
            </div>
          </div>
        )
      })} */}
    </>
  )
}

const ReportControls = ({ active, open }) =>
  active ? <ActiveReportControls /> : <IdleReportControls open={open} />

const IdleReportControls = ({ open }) => {
  return (
    <div className="flex w-fit flex-col justify-center align-middle">
      <button className="btn-ghost btn-sm btn" onClick={open}>
        Investigate
      </button>
    </div>
  )
}

const ActiveReportControls = () => {
  return (
    <div className="absolute right-0 flex w-fit flex-col justify-center align-middle">
      <button className="btn-error btn-sm btn mb-2">Ban</button>
      <button className="btn-outline btn-sm btn">Dismiss</button>
      <button className="btn-outline btn-sm btn mt-8">Abuse</button>
    </div>
  )
}

const ReportContent = ({ r, active }) =>
  active ? <ActiveReportContent r={r} /> : <IdleReportContent r={r} />

const IdleReportContent = ({ r }) => {
  return (
    <div className="mt-4 flex w-[500px] justify-between">
      <div>
        <div className="mb-2 text-xl font-semibold">Event</div>
        {r.event.name}
      </div>
      <div>
        <div className="mb-2 text-xl font-semibold">Date</div>
        {new Date(r.event.date).toLocaleString()}
      </div>
    </div>
  )
}

const ActiveReportContent = ({ r }) => {
  return (
    <>
      <IdleReportContent r={r} />
      <div className="mt-4 flex flex-col">
        <div className="text-2xl font-semibold">Report</div>
        <div className="mt-2">
          <div className="mb-2 text-xl font-semibold">Claim</div>
          <div>{r.report.claim}</div>
        </div>
        <div className="mt-2">
          <div className="mb-2 text-xl font-semibold">Proof</div>
          <div className="flex">
            {r.report.proofs.map((p) => (
              <div key={p.id}>
                <Image
                  width={100}
                  height={100}
                  src={p.file}
                  alt={p.name}
                  className="m-0 mr-4 bg-white"
                />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
