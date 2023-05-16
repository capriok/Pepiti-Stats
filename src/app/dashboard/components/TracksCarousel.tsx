import { AllTracks } from '../../types'
import { Carousel } from 'flowbite-react'
import { TrackTable } from '../common/tables/TrackTable'
import React from 'react'
import Link from 'next/link'

export const TracksCarousel = ({ tracks }: { tracks: AllTracks }) => {
   return (
      <div className="h-full">
         <Carousel indicators={false} slideInterval={10000}>
            {tracks.records?.map((track) => (
               <React.Fragment key={track.name}>
                  <div className="flex flex-col md:flex-row items-start juistify-center space-between mb-2 z-[9999]">
                     <div className="flex-1 font-medium text-green-400 text-lg">
                        <Link
                           prefetch={false}
                           href={`/track/${track.name}`}
                           className="w-fit whitespace-nowrap">
                           <h1 className="px-2 py-1 hover:bg-neutral-800/40 rounded-full">
                              {track.name}
                           </h1>
                        </Link>
                     </div>
                     <div className="w-full md:w-fit text-sm flex items-center justify-center whitespace-nowrap uppercase font-semibold text-blue-300 text-center px-4 py-1 bg-blue-600/30 rounded-full">
                        Total Laps: {track.laps.toLocaleString()}
                     </div>
                  </div>
                  <div className="pb-2 md:pb-0 overflow-hidden overflow-x-scroll md:overflow-x-visible">
                     <TrackTable records={track.records} rankStyle={false} rowCn="py-3" />
                  </div>
               </React.Fragment>
            ))}
         </Carousel>
      </div>
   )
}
