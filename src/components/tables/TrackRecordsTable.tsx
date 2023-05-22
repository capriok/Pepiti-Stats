'use client'

import Link from 'next/link'
import Table from '~/components/Table'
import { handleBikeColor } from '~/utils/handleBikeColor'
import { handleLapTimes } from '~/utils/handleLapTimes'
import RiderLink from '../RiderLink'

interface Props {
  records: TrackRecord[]
}

export const TrackRecordsTable = ({ records }: Props) => {
  const data = records.map((r) => ({
    ...r,
    name: r.rider_name,
  }))

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (name, row) => <RiderLink href={`/profile/${row.rider_guid}`}>{name}</RiderLink>,
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
        <div className="flex items-center justify-start">
          <div className={`mr-3 h-5 w-2 ${handleBikeColor(bike)}`} />
          <div className="py-1">
            <p>{bike} </p>
          </div>
        </div>
      ),
    },
  ]

  return <Table data={data} columns={columns} searchEnabled={true} paginationEnabled={true} />
}
