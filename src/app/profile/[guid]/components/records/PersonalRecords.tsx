import React, { useState } from 'react'
import { handleLapTimes } from '../../../utils/handleLapTimes'
import { handleBikeColor } from '../../../utils/handleBikeColor'
import { dateIsValid } from '../../../utils/dateIsValid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Loader from '../../common/Loader'
import useSWR from 'swr'
import { IconAlarm, IconHourglassHigh, IconMotorbike } from '@tabler/icons'
import { METER_TO_MILE } from '../ProfileCard'

export const PersonalRecords = () => {
   const {
      query: { slug },
   } = useRouter()
   const { data: recordsData } = useSWR(`/api/rider/records/${slug}`)
   const [search, setSearch] = useState('')

   if (!recordsData) {
      return <Loader text="Loading rider records..." />
   }

   const personalRecords = recordsData.records

   return (
      <div className="flex flex-col gap-5 text-neutral-400 px-2 not-prose">
         <div className="my-10">
            <h1>Track</h1>
            <input
               placeholder="Search for track..."
               value={search}
               onChange={(event) => setSearch(event.currentTarget.value)}
               type="text"
               className="bg-neutral-700 w-full p-2 border-green-900 ring-green-900 focus:outline-none focus:border-green-500 focus:ring-green-500 rounded-md"
            />
         </div>
         {!personalRecords[0] && <p>No records...</p>}
         {personalRecords
            .filter(
               (record) =>
                  typeof record.track === 'string' &&
                  record.track.toLowerCase().includes(search.toLowerCase())
            )
            .map((record, idx) => {
               const timestamp = record._id.slice(0, 8)
               const date = new Date(parseInt(timestamp, 16) * 1000)

               const bikeColor = handleBikeColor(record.bike)
               console.log(record)

               return (
                  <div key={idx} className="bg-neutral-800/40 border-none rounded-box p-5">
                     <div className="flex flex-col gap-3">
                        <div className="flex justify-between w-full">
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
                        <div className="flex justify-start font-medium my-3">
                           <div className={`w-2 h-5 mr-3 ${bikeColor}`} />
                           <div>
                              <p>{record.bike}</p>
                           </div>
                        </div>
                     </div>
                     <div className="stats shadow-lg w-full">
                        <div className="stat">
                           <div className="stat-figure text-warning">
                              <IconMotorbike />
                           </div>
                           <div className="stat-title">Average Speed</div>
                           <div className="stat-value py-2 text-2xl">
                              {(record.average_speed * METER_TO_MILE).toFixed(2)}{' '}
                              <span className="font-normal text-sm">mph</span>
                           </div>
                        </div>

                        <div className="stat">
                           <div className="stat-figure text-secondary">
                              <IconAlarm />
                           </div>
                           <div className="stat-title">Split 1</div>
                           <div className="stat-value py-2 text-2xl">
                              {handleLapTimes(record.split_1)}
                           </div>
                        </div>

                        <div className="stat">
                           <div className="stat-figure text-secondary">
                              <IconAlarm />
                           </div>
                           <div className="stat-title">Split 2</div>
                           <div className="stat-value py-2 text-2xl">
                              {handleLapTimes(record.split_2)}
                           </div>
                        </div>

                        <div className="stat">
                           <div className="stat-figure text-error">
                              <IconHourglassHigh />
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
   )
}
