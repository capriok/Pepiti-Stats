"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useUserContext } from '~/app/providers'
import Tabs from "~/components/Tabs"
import BlacklistTable from "./BlacklistTable"

interface Props {
  blacklistSR: any
  blacklistNonSR: any
}

export default function Blacklists({  blacklistSR, blacklistNonSR }: Props) {
  const user = useUserContext()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") ?? ""
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && user.isAdmin

  const tabs = [
    {
      key: "blacklistNonSr",
      label: "Global Blacklist",
      children: (
        <div className="p-4">
          {!isAdministrating && (
            <>
              <BlacklistAlert
                color="bg-red-800/80"
                text="If youre on this list, you did something worthy of being banned from online racing for the foreseeable future"
              />
              <BanAppealButtons />
            </>
          )}
          <BlacklistTable blacklist={blacklistNonSR} isAdministrating={isAdministrating} />
        </div>
      ),
    },
    {
      key: "blacklistSr",
      label: "Safety Rating Blacklist",
      children: (
        <div className="p-4">
          {!isAdministrating && (
            <>
              <BlacklistAlert
                color="bg-orange-800/80"
                text="If youre on this list, you have a Safety Rating below 950, race in a banned/no-contact server to build your SR back up"
              />
              <BanAppealButtons />
            </>
          )}
          <BlacklistTable blacklist={blacklistSR} isAdministrating={isAdministrating} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex justify-center">
      <div className="card card-body w-full bg-base-200 p-0">
        <Tabs items={tabs} wide={true} defaultActive={tabParam} />
      </div>
    </div>
  )
}

const BlacklistAlert = ({ text, color }) => (
  <div className={`my-4 rounded-xl ${color} text-white`}>
    <div className="text-desc grid place-items-center p-4">{text}</div>
  </div>
)

const BanAppealButtons = () => {
  const router = useRouter()

  return (
    <div className="mb-4 flex w-fit flex-wrap justify-center gap-2 md:mb-0 md:w-full md:justify-end">
      <button
        disabled={true}
        className="btn-outline btn-ghost btn-sm btn"
        onClick={() => router.push(`/appeal`)}
      >
        On-Site Appeal
      </button>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://discord.com/invite/mx-bikes"
        className="btn-outline btn-ghost btn-sm btn"
      >
        Discord Appeal
      </Link>
    </div>
  )
}
