'use client'
import Link from 'next/link'
import Spinner from '../Spinner'
import Table, { TableOptions } from '../Table'
import Api from '~/api/api'

interface Props extends TableOptions {
  data?: TopRecordData[]
  seeMore?: boolean
  useTop10?: boolean
  limit?: number
}

export default async function TopDonators(props: Props) {
  const { limit = 10 } = props
  const data = await Api.GetDynamicTopRecords('donators', limit)

  if (!data) {
    return (
      <div className="flex flex-1 h-full w-full justify-center items-center">
        <Spinner color="text-green-700 fill-green-300" />
      </div>
    )
  }

  // const { data, useTop10 = true, ...rest } = props
  const dataWithDonations = data.donators.filter((rider) => rider.donation > 0)

  const columns = [
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => (
        <>{row.donation > 0 && <Link href={`/profile/${row._id}`}>{name}</Link>}</>
      ),
    },
    {
      key: 'donation',
      label: 'Amount',
      align: 'right',
      render: (donation) => <>{donation > 0 && <span>${donation}</span>}</>,
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        data={props.useTop10 ? data.donators : dataWithDonations}
        {...props}
      />
      {props.seeMore && (
        <Link href="/dashboard/top/donators" className="text-sm text-primary link no-underline">
          See More
        </Link>
      )}
    </>
  )
}
