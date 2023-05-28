'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowRightIcon } from 'lucide-react'
import ReportActions from './ReportActions'

interface Props {
  reports: Array<RiderReport>
}

export default function ReportsList({ reports }: Props) {
  console.log("%cAdmin Reports", "color: steelblue", { reports })

  const [openReport, setOpenReport] = useState({} as RiderReport)

  const handleIdleControlsClick = (report) => {
    setOpenReport(report)
  }

  return (
    <>
      {reports.map((report) => {
        const reportActive = report._id === openReport._id
        return (
          <div key={report._id} className="card bg-base-200 p-4 md:p-8">
            <div className="flex w-full justify-between">
              <div className="flex align-middle text-2xl">
                {/* // ? api should return "user" object as rider is but for report.by (the user) */}
                {report.by?._id} <ArrowRightIcon className="mx-4 mt-1" />
                {report.by?.name}
              </div>
              <div className="relative">
                {reportActive ? (
                  <ReportActions
                    reportId={report._id}
                    riderGuid={report.rider?._id}
                    riderName={report.rider?.name}
                  />
                ) : (
                  <IdleReportControls open={() => handleIdleControlsClick(report)} />
                )}
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

const IdleReportControls = ({ open }) => {
  return (
    <div className="flex w-fit flex-col justify-center align-middle">
      <button className="btn-outline btn-secondary btn-ghost btn-sm btn" onClick={open}>
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
      <div>
        <div className="mb-2 text-lg font-semibold">Race</div>
        {report.race.track}
      </div>
      <div>
        <div className="mb-2 text-xl font-semibold">Date</div>
        {new Date(parseInt(report.race._id.slice(0, 8), 16) * 1000).toLocaleString()}
      </div>
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
          <div>{report?.reason}</div>
        </div>
        <div className="mt-2">
          <div className="mb-2 text-lg font-semibold">Proof</div>
          <div className="flex">
            {/* // ? when submitting a rider report, restrict link not to imgur/ gyazo imgs
            // ? we need to only support a certain proof hosting domains, (imgur, gyazo) 
            // ? next requires img src domains to be configured in next.config.js, also creates ease for security for admins
            <Image src={report.proofs} alt="proof1" priority={true} width={300} height={300} /> */}
            {report.proofs.map((p) => (
              <div key={report._id + p}>
                {/* <Image
                  width={100}
                  height={100}
                  src={p}
                  alt={p.name}
                  className="m-0 mr-4 bg-white"
                  priority={true}
                /> */}
                {/* // ? single proof deprecated */}
                <a href={p} target="_blank" rel="noopener noreferrer">
                  {p}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
