'use client'

import { Suspense, useRef } from 'react'
import Image from 'next/image'
import Table from '~/components/Table'
import LineChart from './LineChart'
import { InfoIcon } from 'lucide-react'
import Api from '~/api/api'

const categories = [
  'MX1 OEM',
  'MX1-2T OEM',
  'MX2 OEM',
  'MX2-2T OEM',
  'MX3 OEM',
  'SM1 OEM',
  'SM1-2t OEM',
  'SM2 OEM',
  'SM2-2t OEM',
]

interface Props {
  user: User
  rider: any
}

export const METER_TO_MILE = 2.23694

export const ProfileCard = ({ user, rider }: Props) => {
  const riderWRCategories = Object.keys(rider.world_records).filter((c) => categories.includes(c))
  const data = riderWRCategories
    .map((category, i) => ({
      _id: i + category + rider.world_records[category],
      category: category,
      records: rider.world_records[category],
    }))
    .sort((a, b) => b.records - a.records)

  const columns = [
    {
      key: 'category',
      label: 'Category',
    },
    {
      key: 'records',
      label: 'Records',
      render: (records) => <div className="my-3">{records}</div>,
    },
  ]

  return (
    <>
      <div className="mt-3 rounded-box not-prose p-5 mx-auto">
        <ProfileContent user={user} rider={rider} />
      </div>
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        <div className="w-full flex flex-col justify-around card card-body bg-base-200">
          <div className="flex items-center text-xl">
            <h4 className="m-0">Total World Records:</h4>
            <span className="ml-2">{rider.world_records.total}</span>
          </div>
          <Table data={data} columns={columns} rankEnabled={false} />
        </div>
        <div className="w-full">
          {/* @ts-expect-error */}
          {/* <LineChart guid={rider._id} /> */}
        </div>
      </div>
    </>
  )
}

const ProfileContent = ({ user, rider }) => {
  return (
    <div className="max-w-full">
      <AdminControls user={user} rider={rider} />

      <div className="mb-5">
        <BannedBanner rider={rider} />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:gap-10">
        <RiderAvatar rider={rider} />
        <div className="w-full lg:w-3/4 overflow-hidden">
          <h4>Rider Stats</h4>
          <RiderStats rider={rider} />
          <h4>Race Stats</h4>
          <RaceStats rider={rider} />
        </div>
      </div>
    </div>
  )
}

const RiderStats = ({ rider }) => {
  return (
    <div className="stats bg-base-200 shadow-xl w-full mb-10">
      <div className="stat">
        <div className="stat-title">MMR</div>
        <div className="stat-value py-2 text-2xl">{rider.MMR}</div>
        <div className="stat-desc">Matchmaking Rating</div>
      </div>

      <div className="stat">
        <div className="stat-title">SR</div>
        <div className={`stat-value py-2 text-2xl ${rider.banned_by === 'SR' && ' text-error'}`}>
          {rider.SR}
        </div>
        <div className="stat-desc">Safety Rating</div>
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
    <div className="stats bg-base-200 shadow-xl w-full">
      <div className="stat">
        <div className="stat-title">First</div>
        <div className="stat-value py-2 text-2xl">{rider.races.first}</div>
        <div className="stat-desc">The Winner Circle</div>
      </div>

      <div className="stat">
        <div className="stat-title">Second</div>
        <div className={`stat-value py-2 text-2xl`}>{rider.races.second}</div>
        <div className="stat-desc">The Second best</div>
      </div>

      <div className="stat">
        <div className="stat-title">Third</div>
        <div className="stat-value py-2 text-2xl">{rider.races.third}</div>
        <div className="stat-desc">Best of the rest</div>
      </div>
      <div className="stat">
        <div className="stat-title">Races</div>
        <div className="stat-value py-2 text-2xl">{rider.races.total_races}</div>
        <div className="stat-desc">Total Races</div>
      </div>
      <div className="stat">
        <div className="stat-title">Fastest Laps</div>
        <div className="stat-value py-2 text-2xl">{rider.races.fastlap}</div>
        <div className="stat-desc">Just sending it</div>
      </div>

      <div className="stat">
        <div className="stat-title">Holeshots</div>
        <div className="stat-value py-2 text-2xl">{rider.races.holeshot}</div>
        <div className="stat-desc">If you aint first, youre last</div>
      </div>
    </div>
  )
}

const RiderAvatar = ({ rider }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="avatar indicator">
        <span className={`indicator-item badge ${rider.online ? 'badge-primary' : 'badge-error'}`}>
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
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-md w-24">
              <span className="text-3xl">{rider.name.slice(0, 2)}</span>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="md:text-2xl flex gap-2 font-semibold">{rider.name}</div>
        {rider.donation > 0 && (
          <Image
            src="/assets//brand/SVGs/flag.svg"
            className="w-6 h-6"
            alt=""
            width={10}
            height={10}
          />
        )}
      </div>
    </div>
  )
}

const BannedBanner = ({ rider }) => {
  const tipText =
    '- SR Banned means your safety rating is under 900. Race in a banned/no-contact server to build your SR back up.\n\n- Global ban means you are on the global blacklist. No help for you.\n\nCustom message ban means you should go to the #ban-appeal discord channel under Pepiti-Stats.'
  return (
    rider.banned && (
      <div className="alert alert-error shadow-lg py-2 flex justify-end">
        <div>
          <div
            className="tooltip tooltip-bottom md:tooltip-left whitespace-pre-line text-left"
            data-tip={tipText}>
            <InfoIcon />
          </div>
          <h1>{rider.banned_by + ' Ban'}</h1>
        </div>
      </div>
    )
  )
}

const AdminControls = ({ user, rider }) => {
  const reasonRef = useRef<HTMLInputElement>(null)

  async function banUser() {
    if (reasonRef.current) {
      await Api.BanRider(rider._id, reasonRef.current.value, user.token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }

  async function unbanUser() {
    await Api.UnBanRider(rider._id, user.token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <Suspense>
      {user.isAdmin && (
        <div className="flex justify-end mb-2">
          {rider.banned ? (
            <button className="btn btn-error btn-sm" onClick={() => unbanUser()}>
              Unban User
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-error">
                Ban User
              </label>
              <div
                tabIndex={0}
                className="dropdown-content bg-neutral-800/70 backdrop-blur-md card card-compact w-64 mx-auto p-2 shadow-xl border-[1px] border-error mt-2">
                <div className="card-body">
                  <div>
                    <label className="label">
                      <span className="label-text">Reason</span>
                    </label>
                    <input
                      ref={reasonRef}
                      className="input input-bordered input-sm w-full"
                      placeholder="Reason for ban..."
                    />
                  </div>
                  <button className="btn btn-error btn-sm" onClick={() => banUser()}>
                    Ban
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Suspense>
  )
}
