import Link from 'next/link'
import Spinner from '../Spinner'
import { handleBikeColor } from '~/utils/handleBikeColor'
import Table, { TableOptions } from '~/components/Table'
import Api from '~/api/api'

interface Props extends TableOptions {
  data?: TopRecordData[]
  seeMore?: boolean
  limit?: number
}

export default async function TopBikes(props: Props) {
  const { limit = 10 } = props
  const data = await Api.GetDynamicTopRecords('bikes', limit)

  if (!data) {
    return (
      <div className="flex flex-1 h-full w-full justify-center items-center">
        <Spinner color="text-green-700 fill-green-300" />
      </div>
    )
  }

  const dataWithIds = data.bikes.map((d, i) => ({ ...d, _id: i + d.name + d.laps }))

  const columns = [
    {
      key: 'name',
      label: 'Bike',
      render: (name) => (
        <div className="flex justify-start items-center font-medium">
          <div className={`w-2 h-5 mr-3 ${handleBikeColor(name)}`} />
          <div className="py-1">
            <span>{name} </span>
          </div>
        </div>
      ),
    },
    {
      key: 'laps',
      label: 'Laps',
      align: 'right',
      render: (laps) => <>{laps.toLocaleString()}</>,
    },
  ]

  return (
    <>
      <Table columns={columns} data={dataWithIds} {...props} />
      {props.seeMore && (
        <Link href="/dashboard/top/bikes" className="text-sm text-primary link no-underline">
          See More
        </Link>
      )}
    </>
  )
}
