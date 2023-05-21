'use client'
import { usePathname } from 'next/navigation'
import { Pill } from '~/components/pills/Pill'
import Table from '~/components/Table'
import Tabs from '~/components/Tabs'

interface Props {
  user: User
  blacklistSR: any
  blacklistNonSR: any
}

export default function Blacklists({ user, blacklistSR, blacklistNonSR }: Props) {
  const pathname = usePathname()

  const isAdminPage = pathname!.includes('/admin')
  const isAdmin = isAdminPage && user.isAdmin

  const tabs = [
    {
      key: 'blacklist-sr',
      label: 'Safety Rating Blacklist',
      children: <BlacklistTable blacklist={blacklistSR} isAdmin={isAdmin} />,
    },
    {
      key: 'blacklist-nonsr',
      label: 'General Blacklist',
      children: <BlacklistTable blacklist={blacklistNonSR} isAdmin={isAdmin} />,
    },
  ]

  return (
    <div className="flex justify-center">
      <div className="card card-body w-full bg-base-200">
        <Tabs items={tabs} wide={true} />
      </div>
    </div>
  )
}

const BlacklistTable = ({ blacklist, isAdmin }) => {
  const data = blacklist.map((rider) => ({
    ...rider,
    guid: rider._id,
  }))
  const columns = [
    {
      key: 'guid',
      label: 'GUID',
    },
    {
      key: 'name',
      label: 'Name',
      render: (name) => name.replace(/NIGGER|Nigger|Nigg|nigger|nigg/, '******'),
    },
    {
      key: 'MMR',
      label: 'MMR',
      render: (MMR, row) => <Pill text={MMR} />,
    },
    {
      key: 'SR',
      label: 'SR',
      render: (SR, row) => <Pill text={SR} />,
    },
    {
      key: 'contact',
      label: 'Contacts',
      render: (contact, row) => <Pill text={contact} />,
    },
    {
      key: 'banned_by',
      label: 'Reason',
      render: (reason) => (
        <Pill
          text={reason.charAt(0).toUpperCase() + reason.slice(1)}
          color={renderBannedBy(reason)}
        />
      ),
    },
  ]

  const adminColumn = {
    key: 'admin',
    label: 'Admin',
    render: (_, row) => {
      return <button className="btn-outline btn-sm btn mb-2">Unban</button>
    },
  }

  if (isAdmin) columns.push(adminColumn as any)

  return (
    <Table
      data={data}
      columns={columns}
      rankEnabled={false}
      searchKey="guid"
      searchEnabled={true}
      resultsEnabled={true}
    />
  )
}

const renderBannedBy = (reason) => {
  switch (reason.toLowerCase()) {
    case 'global':
    case 'perma':
    case 'racism':
      return 'red'
    case 'sr':
      return 'orange'
    default:
      return 'green'
  }
}
