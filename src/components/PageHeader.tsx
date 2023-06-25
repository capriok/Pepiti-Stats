"use client"

import { usePathname } from "next/navigation"
import DonationBanner from "~/app/dashboard/components/DonationBanner"

interface Props {
  title: string
  width: string
  extra?: React.ReactNode
  tabs?: React.ReactNode
}

const PageHeader: React.FC<Props> = ({ title, extra, width, tabs }) => {
  const pathname = usePathname()

  const isAtDashboard = pathname === "/dashboard"
  const marginBottom = isAtDashboard ? "mb-0" : "mb-10"
  const headerCn = `bg-base-200 px-4 flex md:justify-center shadow-md border-b border-accent/40 ${marginBottom}`

  return (
    <>
      <div className={headerCn}>
        <div
          className={`relative flex w-full flex-col py-14 md:flex-row md:items-center md:justify-between ${width}`}
        >
          <div className="mb-2 flex-1 text-2xl font-bold md:mb-0 md:text-3xl">{title}</div>
          <div className="flex justify-start">
            {extra}
            <div className="absolute bottom-0 right-0">{tabs}</div>
          </div>
        </div>
      </div>
      {isAtDashboard && <DonationBanner />}
    </>
  )
}

export default PageHeader
