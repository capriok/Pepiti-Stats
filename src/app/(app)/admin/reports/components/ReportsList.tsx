'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowRightIcon } from 'lucide-react'
import ReportActions from './ReportActions'

interface Props {
  reports: Array<RiderReport>
}

export default function ReportsList({ reports }: Props) {
  console.log('%cAdmin Reports', 'color: steelblue', { reports })

  const [openReport, setOpenReport] = useState({} as RiderReport)

  const handleIdleControlsClick = (report) => {
    setOpenReport(report)
  }

  return (
    <>
      {reports.map((report) => {
        const reportActive = report._id === openReport._id
        return (
          <div key={report._id} className="card card-body my-4 w-full bg-base-200">
            <div className="flex w-full justify-between">
              <div className="flex align-middle text-2xl">
                {/* // ? api should return "user" object as rider is but for report.by (the user) */}
                {report.by} <ArrowRightIcon className="mx-4 mt-1" />
                {report.rider?.name}
              </div>
              <div className="relative">
                <ReportControls
                  active={reportActive}
                  open={() => handleIdleControlsClick(report)}
                />
              </div>
            </div>
            <div className="w-full">
              <ReportContent report={report} active={reportActive} />
            </div>
          </div>
        )
      })}
    </>
  )
}

const ReportControls = ({ active, open }) =>
  active ? <ReportActions /> : <IdleReportControls open={open} />

const IdleReportControls = ({ open }) => {
  return (
    <div className="flex w-fit flex-col justify-center align-middle">
      <button className="btn-ghost btn-sm btn" onClick={open}>
        Investigate
      </button>
    </div>
  )
}

const ReportContent = ({ report, active }) =>
  active ? <ActiveReportContent report={report} /> : <IdleReportContent report={report} />

const IdleReportContent = ({ report }) => {
  return (
    <div className="mt-4 flex w-[500px] justify-between">
      {/* // ? api should return event information so we dont have to fetch that 
      <div>
        <div className="mb-2 text-lg font-semibold">Event</div>
        {report.event}
      </div>*/}
      {/* // ? api should return date report was submitted 
       <div>
        <div className="mb-2 text-xl font-semibold">Date</div>
        {new Date(report.event?.date).toLocaleString()}
      </div> */}
    </div>
  )
}

const ActiveReportContent = ({ report }) => {
  return (
    <>
      <IdleReportContent report={report} />
      <div className="mt-4 flex flex-col">
        <div className="text-xl font-semibold">Report</div>
        <div className="mt-2">
          <div className="mb-2 text-lg font-semibold">Reason</div>
          <div>{report.reason}</div>
        </div>
        <div className="mt-2">
          <div className="mb-2 text-xl font-semibold">Proof</div>
          <div className="flex">
            <a href={report.proofs} target="_blank" rel="noopener noreferrer">
              {report.proofs}
            </a>
            {/* // ? client side when submitting a rider report, we need to only support a sole proof hosting domain
            // ? next requires img src domains to be configured in next.config.js, also creates ease for security for admins
            <Image src={report.proofs} alt="proof1" priority={true} width={300} height={300} /> */}
            {/* // ? api should return a list of proofs
            {report.proofs.map((p) => (
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
            ))} */}
          </div>
        </div>
      </div>
    </>
  )
}
