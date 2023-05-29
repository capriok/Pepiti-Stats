"use client"

import BanRiderButton from "~/components/actions/BanRiderButton"
import DismissRiderReport from "~/components/actions/DismissRiderReport"
import DismissAbuseRiderReport from "~/components/actions/DismissRiderReportAbuse"

interface Props {
  reportId: string
  rider: ReportRider
  user: ReportRider
}

export default function ReportActions({ reportId, rider, user }: Props) {
  return (
    <div className="absolute right-0 flex w-fit flex-col justify-center gap-2 align-middle">
      <BanRiderButton riderId={rider._id} name={rider.name} />

      <DismissRiderReport reportId={reportId} />

      <DismissAbuseRiderReport reportId={reportId} userId={user._id} />
    </div>
  )
}
