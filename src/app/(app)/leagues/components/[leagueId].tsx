export default function old() {
  return <></>
}
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import React, { useMemo, useRef, useState } from 'react'
// import useSWR from 'swr'
// import { LeagueData } from '../../components/leagues/LeagueCard'
// import Loader from '../../components/common/Loader'
// import { RiderRecord } from '../../types'
// import { IconArrowLeft, IconArrowRight } from '@tabler/icons'
// import useAuthUser from '../../hooks/useAuthUser'

// import RaceCard from '../../components/leagues/RaceCard'
// import Table from '../../components/common/Table'
// import PageLayout from '../../components/common/PageLayout'
// import { JoinLeagueModal } from '../../components/leagues/JoinLeagueModal'

// function Page() {
//    const router = useRouter()
//    const racesRef = useRef<HTMLDivElement>(null)

//    const leagueId = router.query.leagueId
//    const { data: leagueData, mutate: mutateLeagueData } = useSWR<LeagueData>(
//       leagueId ? `/api/leagues/` + leagueId : null
//    )
//    const { data: leagueUserData } = useSWR<{ rider: RiderRecord }>(
//       leagueData ? '/api/rider/' + leagueData.by : null
//    )
//    const { data: eligibilityData, mutate: mutateEligibility } = useSWR(
//       leagueId ? '/api/leagues/check/' + leagueId : null
//    )

//    const authUser = useAuthUser()
//    const { data: authUserData } = useSWR<{ rider: RiderRecord }>(
//       authUser?._id ? '/api/rider/auth/' + authUser?._id : null
//    )
//    const authRiderRecord = authUserData?.rider

//    // signed in users rider record
//    const authUserTotals = useMemo(
//       () => ({
//          MMR: authRiderRecord?.MMR,
//          SR: authRiderRecord?.SR,
//          races: authRiderRecord?.races.total_races,
//          laps: authRiderRecord?.total_laps,
//          records: 0,
//       }),
//       [authRiderRecord]
//    )

//    if (!leagueData || !eligibilityData) {
//       return (
//          <PageLayout headTitle={`Pepiti | League`}>
//             <Loader text="Loading league..." />
//          </PageLayout>
//       )
//    }

//    // requirements for the league
//    const reqs = Object.keys(leagueData?.requirements).map((req) => {
//       const formattedKey = req.charAt(0).toUpperCase() + req.slice(1)
//       const isMissingReq = eligibilityData[req] === false

//       // TODO: Unreturned amount of records so we are forcing "You have enough" for records
//       const reqDesciption =
//          req === 'records'
//             ? eligibilityData.records
//                ? 'You have enough :)'
//                : "You don't have enough :("
//             : 'You have ' + authUserTotals[req] + ' ' + formattedKey

//       return (
//          <div key={req} className={`stat place-items-center ${isMissingReq && 'text-error'}`}>
//             <div className="stat-title">{formattedKey}</div>
//             <div className="stat-value">{leagueData?.requirements[req] + '+'}</div>
//             <div className="stat-desc">{reqDesciption}</div>
//          </div>
//       )
//    })

//    const leaderboardTableColumns = [
//       {
//          key: 'name',
//          label: 'Rider',
//          render: (name, rider) => (
//             <span>
//                #{rider.race_number}
//                <Link href={`/profile/${rider.guid}`} className="link text-green-500 ml-3">
//                   {name}
//                </Link>
//             </span>
//          ),
//       },
//       { key: 'points', label: 'Points', render: (points) => <span>{points ?? '-'}</span> },
//       { key: 'bike_id', label: 'Bike' },
//       { key: 'team', label: 'Team' },
//    ]

//    const leaderboardTableData = Object.keys(leagueData.riders).map((guid) => {
//       const rider = leagueData.riders[guid]

//       return { _id: rider.guid, ...rider }
//    })

//    const raceCards = leagueData.races.map((race) => (
//       <RaceCard key={race._id} race={race} mutateLeagueData={mutateLeagueData} />
//    ))

//    function handleHorzScroll(scrollLeft: boolean) {
//       if (racesRef.current) {
//          // 350 + 16 is width of RaceCard plus gap of 16px
//          racesRef.current.scrollLeft =
//             racesRef.current.scrollLeft - (350 + 16) * (scrollLeft ? 1 : -1)
//       }
//    }

//    // user has missing requirements to join league
//    const isIneligibleToRace = Object.values(eligibilityData).includes(false)
//    const isJoinLeagueButtonDisabled =
//       eligibilityData.league_joined || isIneligibleToRace || !authRiderRecord?.name
//    const joinLeagueButtonText = isIneligibleToRace
//       ? 'Ineligible to Join League'
//       : eligibilityData.league_joined
//       ? 'Already Registered'
//       : 'League Signup'

//    return (
//       <PageLayout headTitle={`${leagueData.name} League`}>
//          <Link href="/leagues" className="flex justify-center text-green-500">
//             Back to Leagues
//          </Link>

//          <JoinLeagueModal
//             userData={authRiderRecord}
//             leagueData={leagueData}
//             mutateLeagueData={mutateLeagueData}
//             mutateEligibilityData={mutateEligibility}
//          />

//          <div className="py-10 px-4">
//             <div className="flex flex-col md:flex-row">
//                <div className="w-full">
//                   <img src={leagueData?.logo} alt="" className="h-28 w-h-28" />
//                   <h1>{leagueData?.name}</h1>
//                   <p>
//                      {leagueData?.description}

//                      {/* Here to test length of description */}
//                      {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia officiis, eum
//                      est ut cum expedita accusamus atque sint, doloremque accusantium eveniet
//                      consequatur laudantium labore fugiat neque dolores. Cumque nobis a, in eos
//                      incidunt exercitationem qui totam unde amet minus similique neque delectus
//                      aliquid perferendis eveniet accusamus quisquam facere reiciendis culpa officia
//                      enim veritatis recusandae magni. Pariatur, nisi quos soluta, sunt praesentium
//                      voluptates fugiat eum ab voluptas temporibus incidunt quibusdam aut. */}
//                   </p>
//                </div>

//                <div className="w-full flex flex-col items-center justify-center">
//                   <img src={leagueData?.trophy} alt="" className="w-52 h-w-52" />
//                   <span className="opacity-50">Added to your trophies on your profile.</span>
//                </div>
//             </div>

//             {/* <div className="flex flex-wrap justify-center gap-3 my-5">{reqs}</div> */}
//             <div className="flex flex-col mb-3 justify-center">
//                <span className="opacity-50">Requirements</span>
//                <div className="stats shadow">{reqs}</div>
//             </div>

//             <span className="opacity-50">Bike Change Allowed </span>
//             <span className="block font-bold">
//                {!leagueData?.keep_bike_selection ? 'True' : 'False'}
//             </span>

//             <span className="opacity-50">Riders Joined</span>
//             <span className="block font-bold">{leagueData?.total_riders}</span>

//             <span className="opacity-50">Organizer</span>
//             <Link
//                href={`/profile/${leagueData.by}`}
//                className="link block p-0 text-green-500 w-fit">
//                {leagueUserData?.rider.name}
//             </Link>

//             <div className="flex">
//                {/* JOIN-LEAGUE-MODAL - Used to open the modal */}
//                <label
//                   // have to nullify the htmlfor if it should be disabled or btn-disabled can be removed in developer tools
//                   htmlFor={isJoinLeagueButtonDisabled ? '' : 'join-league-modal'}
//                   className={`btn btn-primary w-3/4 mx-auto mt-3
//                   ${isJoinLeagueButtonDisabled && 'btn-disabled'}
//                   `}>
//                   {joinLeagueButtonText}
//                </label>
//             </div>
//          </div>

//          {/* Races - Overflow X Scroll */}
//          <div>
//             <h2 className="mt-1">Races</h2>
//             <div className="hidden md:flex justify-between w-full px-5">
//                <button
//                   className="bg-neutral-700/50 p-3 rounded-full"
//                   onClick={() => {
//                      handleHorzScroll(true)
//                   }}>
//                   <IconArrowLeft />
//                </button>
//                <button
//                   className="bg-neutral-700/50 p-3 rounded-full"
//                   onClick={() => {
//                      handleHorzScroll(false)
//                   }}>
//                   <IconArrowRight />
//                </button>
//             </div>

//             <div
//                className="overflow-x-auto py-3 relative scroll-smooth whitespace-nowrap"
//                ref={racesRef}>
//                {raceCards}
//             </div>
//          </div>

//          {/* Leaderboard of racers */}
//          <div className="overflow-x-auto">
//             <h2>Leaderboard</h2>

//             <Table
//                data={leaderboardTableData}
//                columns={leaderboardTableColumns}
//                searchEnabled
//                searchKey="name"
//             />
//          </div>
//       </PageLayout>
//    )
// }

// export default Page
