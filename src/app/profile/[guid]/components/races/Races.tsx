import React, { useState } from 'react'
import Tabs from '../../common/Tabs'
import { Classification, FastestLap } from '../../../types'
import { handleLapTimes } from '../../../utils/handleLapTimes'
import TextInput from '../../common/TextInput'
import { dateIsValid } from '../../../utils/dateIsValid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '../../common/Loader'

export const Races = () => {
   const {
      query: { slug },
   } = useRouter()
   const { data: racesData } = useSWR(`/api/rider/races/${slug}`)
   const [search, setSearch] = useState('')

   if (!racesData) {
      return <Loader text="Loading race data..." />
   }
   const { races } = racesData

   const RaceContent = ({ race }) => {
      const tabs = [
         {
            key: 'results',
            label: 'Results',
            children: (
               <ClassificationTab
                  classification={race.Classification}
                  fastestLap={race.FastestLap}
               />
            ),
         },
         // {
         //    key: 'fastestLap',
         //    label: 'Fastest Lap',
         //    children: Object.keys(race.FastestLap).map((riderGuid, idx) => {
         //       const fastestLap = race.FastestLap[riderGuid]
         //       return <FastestLapTab key={idx} fastestLap={fastestLap} />
         //    }),
         // },
      ]

      return <Tabs items={tabs} />
   }

   return (
      <div className="flex flex-col gap-3 text-neutral-400 px-2 py-2 drop-shadow-lg">
         <div>
            <h4>Track</h4>
            <TextInput
               placeholder="Search for track..."
               value={search}
               onChange={(event) => setSearch(event.currentTarget.value)}
               type="text"
            />
         </div>
         {!races[0] && <p>No races...</p>}
         {races
            .filter((race) => race.track.toLowerCase().includes(search.toLowerCase()))
            .map((race, idx) => {
               const timestamp = race._id.slice(0, 8)
               const date = new Date(parseInt(timestamp, 16) * 1000)
               const handleBadgeColor =
                  race.MMR.total > 0
                     ? 'badge-primary'
                     : race.MMR.total === 0
                     ? 'badge-warning'
                     : 'badge-error'

               return (
                  <div key={idx} className="rounded-box bg-neutral-800/40 p-3">
                     <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-3">
                           <Link
                              prefetch={false}
                              className="link link-primary text-xl"
                              href={`/track/${race.track}`}>
                              {race.track}
                           </Link>
                           <Link
                              prefetch={false}
                              href={`/races/${race._id}`}
                              className="link link-hover text-neutral-400">
                              Race Details
                           </Link>
                        </div>

                        <p>{dateIsValid(date) ? date.toLocaleDateString() : '-'}</p>
                     </div>
                     <div className="divider divider-vertical"></div>
                     {race.Classification && (
                        <>
                           <div>
                              <div className="flex justify-between mb-3">
                                 <span className="caption">Previous MMR: {race.MMR.old_MMR}</span>
                                 {/* <p className="caption">BPP: {race.MMR.BPP}</p>
                                 <p className="caption">PRB: {race.MMR.PRB}</p>
                                 <p className="caption">NRB: {race.MMR.NRB}</p>
                              <p className="caption">FL: {race.MMR.FL}</p> */}
                              </div>
                              <div className={`badge ${handleBadgeColor} badge-lg`}>
                                 {race.MMR.total > 0 ? '+' + race.MMR.total : race.MMR.total}
                              </div>
                              <span className="caption mt-3 block">
                                 Adjusted MMR: {race.MMR.old_MMR + race.MMR.total}
                              </span>
                           </div>
                           <RaceContent race={race} />
                        </>
                     )}
                     {/* {race.Race1 && (
                        <>
                           <div className="flex justify-between">
                              <h2 className="text-2xl font-bold">Race 1</h2>
                              <MMRBadge key={idx} mmr={race.Race1.MMR.total} />
                           </div>
                           <RaceContent race={race.Race1} />
                        </>
                     )}
                     {race.Race2 && (
                        <>
                           <div className="flex justify-between">
                              <h2 className="text-2xl font-bold">Race 2</h2>
                              <MMRBadge key={idx} mmr={race.Race2.MMR.total} />
                           </div>
                           <RaceContent race={race.Race2} />
                        </>
                     )} */}
                     {!race.Classification && <p>No race data...</p>}
                  </div>
               )
            })}
      </div>
   )
}
const MMRBadge = ({ mmr }: { mmr: number }) => {
   return (
      <div
         className={`${
            mmr > 0 ? 'bg-green-500/30' : mmr === 0 ? 'bg-orange-500/30' : 'bg-red-500/30'
         } w-fit px-2 py-1 rounded-full`}>
         <p
            className={`${
               mmr > 0 ? 'text-green-200' : mmr === 0 ? 'text-orange-200' : 'text-red-200'
            } font-bold`}>
            MMR: {mmr > 0 ? '+' + mmr : mmr}
         </p>
      </div>
   )
}

const FastestLapTab = ({ fastestLap }: { fastestLap: FastestLap }) => {
   return (
      <div>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Position</p>
               <h3 className="text-2xl font-bold">{fastestLap.Pos}</h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Lap Time</p>
               <h3 className="text-2xl font-bold">
                  {typeof fastestLap.LapTime !== 'string'
                     ? handleLapTimes(fastestLap.LapTime as number)
                     : fastestLap.LapTime}
               </h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Lap</p>
               <h3 className="text-2xl font-bold">{fastestLap.Lap ? `#${fastestLap.Lap}` : '-'}</h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Average Speed</p>
               <h3 className="text-2xl font-bold">
                  {fastestLap.Speed ? fastestLap.Speed.toFixed(2) : '-'}
               </h3>
            </div>
         </div>
      </div>
   )
}
const ClassificationTab = ({
   classification,
   fastestLap,
}: {
   classification: Classification
   fastestLap: number
}) => {
   return (
      <div>
         <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2 mr-0 ml-0 not-prose">
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Position</p>
               <h3 className="text-2xl font-bold">{classification.Pos ?? '-'}</h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Laps</p>
               <h3 className="text-2xl font-bold">
                  {classification.Laps ? classification.Laps : '-'}
               </h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Gap</p>
               <h3 className="text-2xl font-bold">
                  {typeof classification.Gap === 'number'
                     ? handleLapTimes(classification.Gap)
                     : '-'}
               </h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Penalties</p>
               <h3 className="text-2xl font-bold">
                  {classification.Penalty ? classification.Penalty : '-'}
               </h3>
            </div>
            <div className="bg-neutral-700/30 rounded-lg p-8">
               <p className="text-lg">Fastest Lap</p>
               <h3 className="text-2xl font-bold">
                  {fastestLap ? handleLapTimes(fastestLap) : '-'}
               </h3>
            </div>
         </div>
      </div>
   )
}
