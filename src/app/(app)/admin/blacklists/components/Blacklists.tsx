'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { unbanRider } from '~/api/server-actions'
import { Pill } from '~/components/pills/Pill'
import Table from '~/components/Table'
import Tabs from '~/components/Tabs'

interface Props {
  isAdmin: boolean
  blacklistSR: any
  blacklistNonSR: any
}

export default function Blacklists({ isAdmin, blacklistSR, blacklistNonSR }: Props) {
  const pathname = usePathname()
  const isAdministrating = pathname.includes('admin') && isAdmin

  const tabs = [
    {
      key: 'blacklist-nonsr',
      label: 'Global Blacklist',
      children: (
        <div className="p-4 pt-0">
          <BlacklistTable blacklist={blacklistNonSR} isAdmin={isAdministrating} />
        </div>
      ),
    },
    {
      key: 'blacklist-sr',
      label: 'Safety Rating Blacklist',
      children: (
        <div className="p-4 pt-0">
          <BlacklistTable blacklist={blacklistSR} isAdmin={isAdministrating} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex justify-center">
      <div className="card card-body w-full bg-base-200 p-0">
        <Tabs items={tabs} wide={true} />
      </div>
    </div>
  )
}

const BlacklistTable = ({ blacklist, isAdmin }) => {
  const searchParams = useSearchParams()
  const guidParam = searchParams.get('guid')

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
      return (
        <form action={unbanRider}>
          <button
            type="submit"
            name="guid"
            value={row.guid}
            className="btn-outline btn-sm btn mb-2">
            Unban
          </button>
        </form>
      )
    },
  }

  if (isAdmin) columns.push(adminColumn as any)

  return (
    <Table
      data={data}
      columns={columns}
      searchKey="guid"
      searchEnabled={true}
      searchTerm={guidParam ?? ''}
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
      return 'green'
  }
}
