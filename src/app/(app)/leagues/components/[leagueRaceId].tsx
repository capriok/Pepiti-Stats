export default function old() {
  return <></>
}
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import React from 'react'
// import useSWR from 'swr'
// import { LeagueRace } from '../../../types'
// import Loader from '../../../components/common/Loader'
// import Table from '../../../components/common/Table'
// import { handleBikeColor } from '../../../utils/handleBikeColor'
// import { handleLapTimes } from '../../../utils/handleLapTimes'
// import Tabs from '../../../components/common/Tabs'
// import axios from 'axios'
// import Spinner from '../../../components/common/Spinner'
// import PageLayout from '../../../components/common/PageLayout'

// function Page() {
//    const { query } = useRouter()
//    const { data: leagueRaceData, mutate: mutateLeagueRaceData } = useSWR<LeagueRace>(
//       query.leagueRaceId ? `/api/leagues/race/${query.leagueRaceId}` : null
//    )
//    const {
//       data: raceEligibilityData,
//       mutate: mutateEligibilityData,
//       isLoading,
//    } = useSWR(query.leagueRaceId ? `/api/leagues/race/check/${query.leagueRaceId}` : null)

//    const status = {
//       0: { msg: 'Registration Open', color: 'bg-green-500/75' },
//       1: { msg: 'Race in Progress', color: 'bg-orange-500/75' },
//       2: { msg: 'Race Finished', color: 'bg-red-500/75' },
//    }

//    if (!leagueRaceData) {
//       return (
//          <PageLayout headTitle="League Race">
//             <Loader text="Loading league race..." />
//          </PageLayout>
//       )
//    }

//    const isRegOpen = leagueRaceData.status === 0

//    const isEligibleToRace = Object.keys(raceEligibilityData)
//       .filter((key) => key !== 'race_joined')
//       .every((key) => raceEligibilityData[key] === true)

//    async function joinRace() {
//       try {
//          await axios.post(`/api/leagues/race/${query.leagueRaceId}`)

//          // refetch leaguedata
//          mutateLeagueRaceData()
//          // refetch eligibility data
//          mutateEligibilityData()
//       } catch (error) {
//          console.log(error)
//       }
//    }

//    async function leaveRace() {
//       try {
//          await axios.delete(`/api/leagues/race/${query.leagueRaceId}`)
//          // refetch leaguedata
//          mutateLeagueRaceData()
//          // refetch eligibility data
//          mutateEligibilityData()
//       } catch (error) {
//          console.log(error)
//       }
//    }

//    const startTime = new Date(leagueRaceData?.timestamp * 1000).toLocaleString()

//    const categories = leagueRaceData.config.event.category.map((category) => {
//       return (
//          <div key={category} className="bg-neutral-700/50 py-1 rounded-full px-2 text-sm font-bold">
//             {category}
//          </div>
//       )
//    })

//    const tabItems = leagueRaceData.divisions.map((division) => {
//       const tableData = division.riders.map((rider) => ({
//          _id: rider.guid,
//          ...rider,
//       }))

//       const columns = [
//          {
//             key: 'race_number',
//             label: '#',
//             render: (race_number) => <div className="font-medium">{race_number}</div>,
//          },
//          {
//             key: 'name',
//             label: 'Rider',
//             render: (name, rider) => (
//                <Link
//                   href={`/profile/${rider.guid}`}
//                   prefetch={false}
//                   className="font-medium link text-green-500">
//                   {name}
//                </Link>
//             ),
//          },
//          {
//             key: 'lap_time',
//             label: 'Lap Time',
//             render: (undefined, rider) => (
//                <p className={``}>{handleLapTimes(rider.record.lap_time)}</p>
//             ),
//          },
//          {
//             key: 'avg_speed',
//             label: 'Avg Speed',
//             render: (undefined, rider) => <p className={``}>{rider.record.average_speed}</p>,
//          },
//          {
//             key: 'bike',
//             label: 'Bike',
//             render: (undefined, rider) => (
//                <p className={`${handleBikeColor(rider.record.bike)} w-fit px-2 rounded-full`}>
//                   {rider.record.bike}
//                </p>
//             ),
//          },
//          {
//             key: 'category',
//             label: 'Category',
//             // align: 'right',
//             render: (undefined, rider) => <p>{rider.record.category}</p>,
//          },
//       ]

//       return {
//          key: division.name,
//          label: <div>{division.name}</div>,
//          children: (
//             <Table data={tableData} columns={columns} searchEnabled={true} searchKey="name" />
//          ),
//       }
//    })

//    return (
//       <PageLayout headTitle="League Race">
//          <Link
//             href={`/leagues/${leagueRaceData.league_id}`}
//             className="link link-primary block text-center">
//             Associated League
//          </Link>

//          <span className="block opacity-50">Start Time</span>
//          <h4 className="mt-0">{startTime}</h4>
//          <div className="flex items-center mt-5 mb-3 gap-4">
//             <h2 className="m-0">{leagueRaceData.config.event.track}</h2>
//             <div className={`${status[leagueRaceData.status].color} rounded-full px-2`}>
//                <span>{status[leagueRaceData.status].msg}</span>
//             </div>
//          </div>

//          <div className="flex gap-3 flex-wrap my-2">{categories}</div>

//          <div className="flex flex-col gap-1">
//             <span>Max Riders: {leagueRaceData.config.connection.maxclient}</span>
//             <span>Deformation: {leagueRaceData.config.deformation.scale}</span>
//             <span>Restart Delay: {leagueRaceData.config.race.restart_delay}</span>
//          </div>

//          <div className="flex flex-wrap my-6 gap-5 md:gap-10 justify-center">
//             <div className="bg-neutral-700/50 flex flex-col gap-3 items-center justify-center px-8 py-4 rounded-md">
//                <span className="opacity-50">Practice Length</span>
//                <h4 className="m-0">{leagueRaceData.config.race.practice_length} Minutes</h4>
//             </div>
//             <div className="bg-neutral-700/50 flex flex-col gap-3 items-center justify-center px-8 py-4 rounded-md">
//                <span className="opacity-50">Qualify Length</span>
//                <h4 className="m-0">{leagueRaceData.config.race.qualifypractice_length} Minutes</h4>
//             </div>
//             <div className="bg-neutral-700/50 flex flex-col gap-3 items-center justify-center px-8 py-4 rounded-md">
//                <span className="opacity-50">Race Length</span>
//                <h4 className="m-0">
//                   {leagueRaceData.config.race.race_minutes} Minutes{' '}
//                   {leagueRaceData.config.race.race_extralaps &&
//                      '+ ' + leagueRaceData.config.race.race_extralaps + ' Laps'}
//                </h4>
//             </div>
//          </div>

//          <button
//             disabled={!isEligibleToRace || !isRegOpen}
//             onClick={() => {
//                if (!raceEligibilityData.race_joined) {
//                   joinRace()
//                } else {
//                   leaveRace()
//                }
//             }}
//             className={`${
//                raceEligibilityData.race_joined
//                   ? 'bg-red-500 [&:not(:disabled)]:hover:bg-red-500/50'
//                   : 'bg-green-500 [&:not(:disabled)]:hover:bg-green-500/50'
//             } my-3 rounded-md font-semibold  disabled:opacity-50 flex justify-center gap-4 w-3/4 p-1 mx-auto`}>
//             <span>{raceEligibilityData.race_joined ? 'Leave' : 'Join'}</span>
//             {isLoading && <Spinner />}
//          </button>

//          <div>
//             <h4>
//                Division Leaderboards{' '}
//                <span className="text-sm opacity-50">
//                   - {leagueRaceData.total_riders} Rider{leagueRaceData.total_riders > 1 && 's'}
//                </span>
//             </h4>

//             <Tabs items={tabItems} />
//          </div>
//       </PageLayout>
//    )
// }

// export default Page
