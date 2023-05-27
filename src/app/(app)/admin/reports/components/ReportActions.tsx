'use client'

import { banRider, dismissReport } from '~/api/actions'

export default function ReportActions() {
  return (
    <div className="absolute right-0 flex w-fit flex-col justify-center gap-2 align-middle">
      <form action={() => {}}>
        {/* // ? commented out real mutation for DX safety for now  */}
        {/* <form action={banRider}> */}
        <button className="btn-outline btn-error btn-sm btn mb-2 w-full" type="submit">
          Ban
        </button>
      </form>

      <form action={dismissReport}>
        <button className="btn-outline btn-sm btn" type="submit">
          Dismiss
        </button>
      </form>

      {/* <form action={dismissReportWithAbuse}>
        <button className="btn-outline btn-sm btn" type="submit">
          Abuse
        </button>
      </form> */}
    </div>
  )
}
