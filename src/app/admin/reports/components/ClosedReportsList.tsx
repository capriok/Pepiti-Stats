"use client"

import { useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "~/ui/Button"

interface Props {
  reports: Array<RiderReport>
}

export default function ClosedReportsList({ reports }: Props) {
  console.log("%cAdmin Reports", "color: steelblue", { reports })

  const [openReport, setOpenReport] = useState({} as RiderReport)

  if (!reports.length)
    return <div className="card card-body mt-4 bg-base-200 text-center">No Results</div>

  return (
    <>
      {reports.map((report) => {
        const reportActive = report._id === openReport._id

        return (
          <div key={report._id} className="card bg-base-200 p-4 md:p-8">
            <div className="flex w-full justify-between">
              <div>
                <div className="flex align-middle text-2xl">
                  {report.by.name}
                  <ArrowRightIcon className="mx-4 mt-1" />
                  {report.rider.name}
                </div>
                <div className="text-md mt-2 flex align-middle text-accent">
                  {report.by._id}
                  <ArrowRightIcon className="mx-2" />
                  {report.rider._id}
                </div>
              </div>
              <div className="relative">
                {!reportActive && <IdleReportControls open={() => setOpenReport(report)} />}
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
      <Button variant="outline" onClick={open}>
        Review
      </Button>
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
        <div className="text-accent">{report.race.track}</div>
      </div>
      <div>
        <div className="mb-2 text-xl font-semibold">Date</div>
        <div className="text-accent">
          {new Date(parseInt(report.race._id.slice(0, 8), 16) * 1000).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

const ActiveReportContent = ({ report }) => {
  return (
    <>
      <IdleReportContent report={report} />
      <div className="mt-4 flex flex-col">
        <div className="mt-2">
          <div className="mb-2 text-lg font-semibold">Reason</div>
          <div className="indent-4 text-accent">{report?.reason}</div>
        </div>
        <div className="mt-2">
          <div className="mb-2 text-lg font-semibold">Proofs</div>
          <div className="flex flex-col gap-2 indent-4">
            {report.proofs.map((p, i) => (
              <div key={report._id + p + i}>
                <div className="flex items-center gap-2">
                  <span>Proof: {i + 1}</span>
                  <a
                    href={p}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost btn-sm btn"
                  >
                    {p}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
