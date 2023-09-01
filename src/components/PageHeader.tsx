"use client"

import { usePathname } from "next/navigation"
import DonationBanner from "~/app/dashboard/components/DonationBanner"

interface Props {
  title: React.ReactNode | string
  width: string
  extra?: React.ReactNode
  subExtra?: React.ReactNode // this is temp until i have a better idea of what to do extend on
}

const PageHeader: React.FC<Props> = ({ title, extra, width, subExtra }) => {
  const pathname = usePathname()

  const isAtDashboard = pathname === "/dashboard"
  const marginBottom = isAtDashboard ? "mb-0" : "mb-10"
  const headerCn = `bg-base-200 px-4 flex md:justify-center shadow-md border-b border-accent/40 ${marginBottom}`

  return (
    <>
      <div className={headerCn}>
        <div
          className={`md:py-18 relative flex w-full flex-col py-10 md:flex-row md:items-center md:justify-between md:py-16 ${width}`}
        >
          <div className="mb-2 flex-1 text-2xl font-bold md:mb-0 md:text-3xl">{title}</div>
          <div className="flex justify-end">{extra}</div>
          <div className="absolute bottom-0 right-0 flex w-full justify-end">{subExtra}</div>
        </div>
      </div>
      {isAtDashboard && <DonationBanner />}
    </>
  )
}

export default PageHeader
