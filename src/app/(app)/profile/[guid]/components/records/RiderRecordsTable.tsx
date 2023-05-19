'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { AlarmPlusIcon, BikeIcon, HourglassIcon } from 'lucide-react'
import { handleBikeColor } from '~/utils/handleBikeColor'
import { dateIsValid } from '~/utils/dateIsValid'
import { handleLapTimes } from '~/utils/handleLapTimes'
import { METER_TO_MILE } from '~/utils/constants'
import Table from '~/components/Table'

interface Props {
  records: Array<any>
}

export default function RiderRecordsTable({ records }: Props) {
  const [term, setTerm] = useState('')

  const data = records.map((record) => ({
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
    <div className="pb-4">
      <div className="my-4 text-xl font-semibold">Personal Records</div>
      <Table columns={columns} data={data} rankEnabled={false} rowCn="py-4" />
    </div>
  )

  return (
    <>
      <div className="mb-2 mt-5">
        <input
          placeholder="Search for track..."
          value={term}
          onChange={(event) => setTerm(event.currentTarget.value)}
          type="text"
          className="w-full rounded-md border-green-900 bg-neutral-700 p-2 ring-green-900 focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>
      <div className="flex flex-col gap-5 text-neutral-400">
        {!records[0] && <p>No records...</p>}
        {records
          .filter(
            (record) =>
              typeof record.track === 'string' &&
              record.track.toLowerCase().includes(term.toLowerCase())
          )
          .map((record, idx) => {
            const timestamp = record._id.slice(0, 8)
            const date = new Date(parseInt(timestamp, 16) * 1000)

            const bikeColor = handleBikeColor(record.bike)
            return (
              <div key={idx} className="rounded-box border-none bg-neutral-800/40 p-5">
                <div className="flex flex-col gap-3">
                  <div className="flex w-full justify-between">
                    <h1 className="text-2xl font-bold">
                      <Link
                        prefetch={false}
                        href={`/track/${record.track}`}
                        className="text-green-500 hover:text-green-700">
                        {record.track}
                      </Link>
                    </h1>
                    <div className="text-lg">
                      {dateIsValid(date) ? date.toLocaleDateString() : '-'}
                    </div>
                  </div>
                  <div className="my-3 flex justify-start font-medium">
                    <div className={`mr-3 h-5 w-2 ${bikeColor}`} />
                    <div>
                      <p>{record.bike}</p>
                    </div>
                  </div>
                </div>
                <div className="stats w-full shadow-lg">
                  <div className="stat">
                    <div className="stat-figure ">
                      <BikeIcon />
                    </div>
                    <div className="stat-title">Average Speed</div>
                    <div className="stat-value py-2 text-2xl">
                      {(record.average_speed * METER_TO_MILE).toFixed(2)}{' '}
                      <span className="text-sm font-normal">mph</span>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure">
                      <AlarmPlusIcon />
                    </div>
                    <div className="stat-title">Split 1</div>
                    <div className="stat-value py-2 text-2xl">{handleLapTimes(record.split_1)}</div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure">
                      <AlarmPlusIcon />
                    </div>
                    <div className="stat-title">Split 2</div>
                    <div className="stat-value py-2 text-2xl">{handleLapTimes(record.split_2)}</div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure ">
                      <HourglassIcon />
                    </div>
                    <div className="stat-title">Lap Time</div>
                    <div className="stat-value py-2 text-2xl">
                      {handleLapTimes(record.lap_time)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
