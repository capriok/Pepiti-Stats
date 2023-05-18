import Image from 'next/image'
import { InfoIcon } from 'lucide-react'
import ServerLineChart from './overview/ServerLineChart'
import { RiderWorldRecordsTable } from './overview/RiderWorldRecordsTable'
import Tabs from '~/components/Tabs'
import ServerRiderRaces from './races/ServerRiderRaces'
import ServerRiderRecords from './records/ServerRiderRecords'
import { METER_TO_MILE } from '~/utils/constants'
import { Suspense } from 'react'
import Spinner from '~/components/Spinner'

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
    <>
      <div className="not-prose rounded-box mx-auto mt-3 p-0 md:p-5">
        <div className="max-w-full">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:gap-10">
            <div className="flex w-full flex-1 justify-center">
              <RiderAvatar rider={rider} />
            </div>
            <div className="w-full overflow-hidden lg:w-3/4">
              <div className="text-md pb-2 font-semibold">Rider Stats</div>
              <RiderStats rider={rider} />
              <div className="text-md pb-2 font-semibold">Race Stats</div>
              <RaceStats rider={rider} />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body mt-10 rounded-lg bg-base-200 p-0">
        <Tabs items={items} wide={true} />
      </div>
    </>
  )
}

const RiderAvatar = ({ rider }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="indicator avatar">
        <span className={`badge indicator-item ${rider.online ? 'badge-primary' : 'badge-error'}`}>
          {rider.online ? 'Online' : 'Offline'}
        </span>
        {rider.avatar ? (
          <Image
            priority={true}
            width={120}
            height={120}
            src={rider?.avatar}
            className="rounded-md"
            alt="riderAvatar"
          />
        ) : (
          <div className="placeholder avatar">
            <div className="w-24 rounded-md bg-neutral-focus text-neutral-content">
              <span className="text-3xl">{rider.name.slice(0, 2)}</span>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex gap-2 font-semibold md:text-2xl">{rider.name}</div>
        {rider.donation > 0 && (
          <Image
            src="/assets//brand/SVGs/flag.svg"
            className="h-6 w-6"
            alt=""
            width={10}
            height={10}
          />
        )}
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
