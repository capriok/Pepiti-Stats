import ServerLineChart from './overview/ServerLineChart'
import { RiderWorldRecordsTable } from './overview/RiderWorldRecordsTable'
import Tabs from '~/components/Tabs'
import ServerRiderRaces from './races/ServerRiderRaces'
import ServerRiderRecords from './records/ServerRiderRecords'
import { METER_TO_MILE } from '~/utils/constants'
import { Suspense } from 'react'
import Spinner from '~/components/Spinner'
import RiderAvatar from './RiderAvatar'

interface Props {
  rider: any
}

export const RiderProfile = ({ rider }: Props) => {
  const items = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <div className="flex flex-col gap-5 lg:flex-row">
          <RiderWorldRecordsTable rider={rider} />
          <div className="w-full">
            <Suspense fallback={<Spinner />}>
              {/* @ts-expect-error */}
              <ServerLineChart guid={rider._id} />
            </Suspense>
          </div>
        </div>
      ),
    },
    {
      key: 'races',
      label: 'Races',
      children: (
        <div className="px-4">
          <Suspense fallback={<Spinner />}>
            {/* @ts-expect-error */}
            <ServerRiderRaces guid={rider._id} />
          </Suspense>
        </div>
      ),
    },
    {
      key: 'records',
      label: 'Records',
      children: (
        <div className="px-4">
          <Suspense fallback={<Spinner />}>
            {/* @ts-expect-error */}
            <ServerRiderRecords guid={rider._id} />
          </Suspense>
        </div>
      ),
    },
  ]
  return (
    <div className="mb-20">
      <div className=" mx-auto mt-3 p-0 md:p-5">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-10">
          <div className="md:mt-0flex mt-10 w-full flex-1 justify-center">
            <RiderAvatar rider={rider} />
          </div>
          <div className="w-full overflow-hidden lg:w-3/4">
            <div className="pb-2 text-lg font-semibold">Rider Stats</div>
            <RiderStats rider={rider} />
            <div className="pb-2 text-lg font-semibold">Race Stats</div>
            <RaceStats rider={rider} />
          </div>
        </div>
      </div>
      <div className="card-body mt-10 rounded-lg bg-base-200 p-0">
        <Tabs items={items} wide={true} />
      </div>
    </div>
  )
}

const RiderStats = ({ rider }) => {
  return (
    <div className="stats mb-10 w-full bg-base-200 shadow-xl">
      <div className="stat">
        <div className="stat-title">MMR</div>
        <div className="stat-value py-2 text-2xl">{rider.MMR}</div>
        <div className="stat-desc">Matchmaking rating</div>
      </div>
      <div className="stat">
        <div className="stat-title">SR</div>
        <div className={`stat-value py-2 text-2xl ${rider.banned_by === 'SR' && ' text-error'}`}>
          {rider.SR}
        </div>
        <div className="stat-desc">Safety rating</div>
      </div>
      <div className="stat">
        <div className="stat-title">Contacts</div>
        <div className="stat-value py-2 text-2xl">{rider.contact}</div>
        <div className="stat-desc">Stay in your lane</div>
      </div>
      <div className="stat">
        <div className="stat-title">Laps</div>
        <div className="stat-value py-2 text-2xl">{rider.total_laps}</div>
        <div className="stat-desc">Finish lines jumped</div>
      </div>
      <div className="stat">
        <div className="stat-title">Speed</div>
        <div className="stat-value py-2 text-2xl">
          {(rider.average_speed * METER_TO_MILE).toFixed(2)}
        </div>
        <div className="stat-desc">Miles per Hour</div>
      </div>
      <div className="stat">
        <div className="stat-title">Favorite Bike</div>
        <div className="stat-value py-2 text-2xl">{rider.favorite_bike.laps} Laps</div>
        <div className="stat-desc">{rider.favorite_bike.name}</div>
      </div>
    </div>
  )
}

const RaceStats = ({ rider }) => {
  return (
    <div className="stats w-full bg-base-200 shadow-xl">
      <div className="stat">
        <div className="stat-title">First</div>
        <div className="stat-value py-2 text-2xl">{rider.races.first}</div>
        <div className="stat-desc">The winner circle</div>
      </div>
      <div className="stat">
        <div className="stat-title">Second</div>
        <div className={`stat-value py-2 text-2xl`}>{rider.races.second}</div>
        <div className="stat-desc">The second best</div>
      </div>
      <div className="stat">
        <div className="stat-title">Third</div>
        <div className="stat-value py-2 text-2xl">{rider.races.third}</div>
        <div className="stat-desc">Best of the rest</div>
      </div>
      <div className="stat">
        <div className="stat-title">Races</div>
        <div className="stat-value py-2 text-2xl">{rider.races.total_races}</div>
        <div className="stat-desc">Total gate drops</div>
      </div>
      <div className="stat">
        <div className="stat-title">Fastest Laps</div>
        <div className="stat-value py-2 text-2xl">{rider.races.fastlap}</div>
        <div className="stat-desc">Just sending it</div>
      </div>
      <div className="stat">
        <div className="stat-title">Holeshots</div>
        <div className="stat-value py-2 text-2xl">{rider.races.holeshot}</div>
        <div className="stat-desc">Wide open right away</div>
      </div>
    </div>
  )
}
