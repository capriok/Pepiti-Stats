'use client'

import React from 'react'
import { fetcher } from '~/api'
import useSWR from 'swr'
import { AlarmPlusIcon, BikeIcon, HourglassIcon } from 'lucide-react'
import { handleBikeColor } from '~/utils/handleBikeColor'
import { dateIsValid } from '~/utils/dateIsValid'
import { handleLapTimes } from '~/utils/handleLapTimes'
import { METER_TO_MILE } from '~/utils/constants'
import Table from '~/components/Table'
import Spinner from '~/components/Spinner'

interface Props {
  guid: string
}

export default function RiderRecordsTable({ guid }: Props) {
  const { data, isLoading } = useSWR(`/rider/${guid}/records`, fetcher)

  if (isLoading)
    return (
      <div className="my-5">
        <Spinner />
      </div>
    )

  const records = data.records.map((record) => ({
    _id: record._id,
    date: parseInt(record._id.slice(0, 8), 16) * 1000,
    track: record.track,
    bike: record.bike,
    averageSpeed: record.average_speed,
    split1: record.split_1,
    split2: record.split_2,
    lapTime: record.lap_time,
  }))

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (date, row) =>
        dateIsValid(new Date(date)) ? new Date(date).toLocaleDateString() : '-',
    },
    {
      key: 'track',
      label: 'Track',
      render: (track, row) => (track ? track : '-'),
    },
    {
      key: 'lapTime',
      label: 'Lap Time',
      render: (lapTime, row) => (lapTime ? handleLapTimes(lapTime) : '-'),
    },
    {
      key: 'split1',
      label: 'Split 1',
      render: (split1, row) => (split1 ? handleLapTimes(split1) : '-'),
    },
    {
      key: 'split2',
      label: 'Split 2',
      render: (split2, row) => (split2 ? handleLapTimes(split2) : '-'),
    },
    {
      key: 'averageSpeed',
      label: 'Average Speed',
      render: (averageSpeed, row) =>
        averageSpeed ? (averageSpeed * METER_TO_MILE).toFixed(2) + ' mph' : '-',
    },
    {
      key: 'bike',
      label: 'Bike',
      render: (bike, row) => {
        const bikeColor = handleBikeColor(bike)
        return (
          <div className="flex">
            <div className={`mr-3 h-5 w-2 ${bikeColor}`} />
            {bike ? bike : '-'}
          </div>
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      data={records}
      searchKey="track"
      searchEnabled={true}
      paginationEnabled={true}
      rankEnabled={false}
    />
  )
}
