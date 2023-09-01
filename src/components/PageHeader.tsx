"use client"

import { ArrowLeft, Backpack, Undo, UndoDot } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import DonationBanner from "~/app/dashboard/components/DonationBanner"

interface Props {
  title: React.ReactNode | string
  width: string
  extra?: React.ReactNode
  subExtra?: React.ReactNode // this is temp until i have a better idea of what to do extend on
  backEnabled?: boolean
}

const PageHeader: React.FC<Props> = ({ title, extra, width, subExtra, backEnabled = false }) => {
  const pathname = usePathname()
  const router = useRouter()

  const isAtDashboard = pathname === "/dashboard"
  const marginBottom = isAtDashboard ? "mb-0" : "mb-10"
  const headerCn = `relative bg-base-200 px-4 flex md:justify-center shadow-md border-b border-accent/40 ${marginBottom}`

  return (
    <>
      <div className={headerCn}>
        <div
          className={`md:py-18 relative flex w-full flex-col py-10 md:flex-row md:items-center md:justify-between md:py-16 ${width}`}
        >
          {backEnabled && (
            <div className="absolute right-0 top-0 hidden md:inline">
              <div
                onClick={() => router.back()}
                className="mt-2 cursor-pointer p-2 pr-4 hover:bg-base-200/80"
                title="Go Back"
              >
                <Undo size={20} />
              </div>
            </div>
          )}
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
