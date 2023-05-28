'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"
import Pill from "~/components/pills/Pill"
import Table from "~/components/Table"
import Tabs from "~/components/Tabs"

interface Props {
  isAdmin: boolean
  blacklistSR: any
  blacklistNonSR: any
}

export default function Blacklists({ isAdmin, blacklistSR, blacklistNonSR }: Props) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") ?? ""
  const pathname = usePathname()
  const isAdministrating = pathname.includes("admin") && isAdmin

  const tabs = [
    {
      key: "blacklistNonSr",
      label: "Global Blacklist",
      children: (
        <div className="p-4">
          <BlacklistAlert
            color="bg-red-800/80"
            text="If youre on this list, you did something worthy of being banned from online racing for the foreseeable future"
          />
          {!pathname.includes("admin") && <BanAppealButtons />}
          <BlacklistTable blacklist={blacklistNonSR} isAdmin={isAdministrating} />
        </div>
      ),
    },
    {
      key: "blacklistSr",
      label: "Safety Rating Blacklist",
      children: (
        <div className="p-4">
          <BlacklistAlert
            color="bg-orange-800/80"
            text="If youre on this list, you have a Safety Rating below 950, race in a banned/no-contact server to build your SR back up"
          />
          {!pathname.includes("admin") && <BanAppealButtons />}
          <BlacklistTable blacklist={blacklistSR} isAdmin={isAdministrating} />
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
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://discord.com/invite/mx-bikes"
        className="btn-outline btn-ghost btn-sm btn"
      >
        Ban Appeal (MXB Discord)
      </Link>
      <button
        disabled={true}
        className="btn-outline btn-ghost btn-sm btn"
        onClick={() => router.push(`/report/appeal`)}
      >
        Ban Appeal (On-Site)
      </button>
    </div>
  )
}

const BlacklistTable = ({ blacklist, isAdmin }) => {
  const searchParams = useSearchParams()
  const guidParam = searchParams.get("guid")

  const data = blacklist.map((rider) => ({
    ...rider,
    guid: rider._id,
  }))
  const columns = [
    {
      key: "guid",
      label: "GUID",
    },
    {
      key: "name",
      label: "Name",
      render: (name) => name.replace(/NIGGER|Nigger|Nigg|nigger|nigg/, "******"),
    },
    {
      key: "MMR",
      label: "MMR",
      render: (MMR) => <Pill text={MMR} />,
    },
    {
      key: "SR",
      label: "SR",
      render: (SR) => <Pill text={SR} />,
    },
    {
      key: "contact",
      label: "Contacts",
      render: (contact) => <Pill text={contact} />,
    },
    {
      key: "banned_by",
      label: "Reason",
      render: (reason) => (
        <Pill
          text={reason.charAt(0).toUpperCase() + reason.slice(1)}
          color={renderBannedBy(reason)}
        />
      ),
    },
  ]

  const adminColumn = {
    key: "guid",
    label: "Admin",
    render: (guid, row) => <UnbanRiderButton guid={guid} name={row.name} hackit={true} />,
  }

  if (isAdmin) columns.push(adminColumn as any)

  return (
    <Table
      data={data}
      columns={columns}
      searchKey="guid"
      searchEnabled={true}
      searchTerm={guidParam ?? ""}
      rankEnabled={false}
      paginationEnabled={true}
    />
  )
}

const renderBannedBy = (reason) => {
  switch (reason.toLowerCase()) {
    case 'global':
    case 'perma':
    case 'racism':
    case 'racist':
      return 'red'
    case 'sr':
      return 'orange'
    default:
      return 'secondary'
  }
}
