'use client'

import Link from 'next/link'
import Table from '~/components/Table'
import { handleBikeColor } from '~/utils/handleBikeColor'
import { handleLapTimes } from '~/utils/handleLapTimes'

interface Props {
  records: TrackRecord[]
}

export const TrackTable = ({ records }: Props) => {
  const data = records.slice(0, 250).map((r) => ({
    ...r,
    name: r.rider_name,
  }))

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (name, row) => <Link href={`/profile/${row.rider_guid}`}>{name}</Link>,
    },
    {
      key: 'lap_time',
      label: 'Lap Time',
      render: (lapTime) => handleLapTimes(lapTime),
    },
    {
      key: 'average_speed',
      label: 'Avg Speed',
      render: (speed) => (speed ? speed.toFixed(2) : ''),
    },
    {
      key: 'split_1',
      label: 'Split 1',
      render: (split) => handleLapTimes(split),
    },
    {
      key: 'split_2',
      label: 'Split 2',
      render: (split) => handleLapTimes(split),
    },
    {
      key: 'bike',
      label: 'Bike',
      render: (bike) => (
        <div className="flex justify-start items-center">
          <div className={`w-2 h-5 mr-3 ${handleBikeColor(bike)}`} />
          <div className="py-1">
            <p>{bike} </p>
          </div>
        </div>
      ),
    },
  ]

  return <Table data={data} columns={columns} />
}
