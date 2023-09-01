"use client"

import { useState } from "react"
import Link from "next/link"
import useSWR from "swr"
import { Button } from "~/ui/Button"
import { Card, CardContent, CardDescription, CardHeader } from "~/ui/Card"
import Pill from "~/components/pills/Pill"
import Spinner from "~/components/Spinner"
import BanRiderDialog from "~/components/dialogs/BanRiderDialog"
import DismissReportDialog from "~/components/dialogs/DismissReportDialog"
import { ArrowRightIcon, X } from "lucide-react"

export default function ReportList({ reports, status }) {
  const [open, setOpen] = useState(undefined)

  if (!reports.length)
    return (
      <Card>
        <CardHeader>
          <CardDescription className="flex w-full justify-center">No Results</CardDescription>
        </CardHeader>
      </Card>
    )

  return (
    <div className="flex flex-col gap-4">
      {reports.map((report) => {
        const isActive = report._id === open
        return (
          <ReportCard
            key={report._id}
            status={status}
            report={report}
            isActive={isActive}
            setOpen={setOpen}
          />
        )
      })}
    </div>
  )
}

export const ReportCard = ({ status, report, isActive, setOpen }) => {
  const linkProps = {
    rel: "noopener noreferrer",
    target: "_blank",
  }

  return (
    <Card key={report._id}>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Link href={`/profile/${report.by._id}`} {...linkProps}>
              {report.by.name}
            </Link>
            <ArrowRightIcon size={16} />
            <Link href={`/profile/${report.rider._id}`} {...linkProps}>
              {report.rider.name}
            </Link>
          </div>
          <div className="text-md mt-2 hidden items-center gap-2 text-xs text-accent md:flex">
            <Link href={`/profile/${report.by._id}`} {...linkProps}>
              {report.by._id}
            </Link>
            <ArrowRightIcon size={16} />
            <Link href={`/profile/${report.rider._id}`} {...linkProps}>
              {report.rider._id}
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex items-end justify-between">
        <div>
          <div className="mb-2 text-accent">Date</div>
          <div>{new Date(parseInt(report.race._id.slice(0, 8), 16) * 1000).toLocaleString()}</div>
        </div>
        {!isActive ? (
          <div>
            <Button variant="outline" onClick={() => setOpen(report._id)}>
              Review
            </Button>
          </div>
        ) : (
          <Button variant="link" onClick={() => setOpen(undefined)}>
            <X size={18} />
          </Button>
        )}
      </CardContent>

      {isActive && (
        <CardContent>
          <ReportContent report={report} />
          <ReviewContent report={report} status={status} />
        </CardContent>
      )}
    </Card>
  )
}

export const ReportContent = ({ report }) => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <div>
        <div className="mb-2 text-accent">Event</div>
        <div className="overflow-x-auto">{report.race.track}</div>
      </div>
      <div>
        <div className="mb-2 text-accent">Reason</div>
        <div className="overflow-x-auto">{report.reason}</div>
      </div>
      <div>
        <div className="mb-2 text-accent">Proofs</div>
        <div className="flex flex-col gap-2">
          {report.proofs.map((proofLink, i) => (
            <div key={report._id + proofLink + i}>
              {/* <Image
                  width={300}
                  height={300}
                  src={p}
                  alt={p}
                  className="m-0 mr-4 bg-white"
                  priority={true}
                /> */}
              <div className="flex items-center gap-2">
                <span>{i + 1}</span>
                <a
                  href={proofLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-sm btn overflow-x-auto"
                >
                  {proofLink}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ReviewContent = ({ report, status }) => {
  const ClosedContent = () => {
    const { data: riderData, isLoading } = useSWR(`/rider/${report.rider._id}`)

    console.log(riderData)

    return (
      <div className="mt-6 flex gap-2">
        <div>Rider Banned?</div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Pill
            text={riderData?.banned ? "True" : "False"}
            color={riderData?.banned ? "red" : "neutral"}
          />
        )}
      </div>
    )
  }

  return (
    <>
      {status === "open" ? (
        <>
          <br />
          <div className="flex justify-between">
            <BanRiderDialog guid={report.rider._id} name={report.rider.name} hackit={true} />
            <DismissReportDialog
              reportId={report._id}
              date={new Date(parseInt(report.race._id.slice(0, 8), 16) * 1000).toLocaleString()}
              event={report.race.track}
              user={report.by.name}
              rider={report.rider.name}
              hackit={true}
            />
          </div>
        </>
      ) : (
        <ClosedContent />
      )}
    </>
  )
}
