import Link from 'next/link'

interface Props {
  race: LeagueRace
}

export default function LeagueRaceCard({ race }: Props) {
  //  const eventDate = new Date(race.timestamp * 1000)
  //  const [trackImage, setTrackImage] = useState(race?.track_image_url)
  //  const status = {
  //     0: { msg: 'Registration Open', color: 'bg-green-500/75' },
  //     1: { msg: 'Race in Progress', color: 'bg-orange-500/75' },
  //     2: { msg: 'Race Finished', color: 'bg-red-500/75' },
  //  }
  //  const isRegOpen = race.status === 0
  //  const {
  //     data: raceEligibilityData,
  //     mutate: mutateEligibilityData,
  //     isLoading,
  //  } = useSWR(`/api/leagues/race/check/${race._id}`)

  //  if (!raceEligibilityData) {
  //     return <Loader text="Loading league race..." />
  //  }

  //  const isEligibleToRace = Object.keys(raceEligibilityData)
  //     .filter((key) => key !== 'race_joined')
  //     .every((key) => raceEligibilityData[key] === true)

  //  async function joinRace() {
  //     try {
  //        await axios.post(`/api/leagues/race/${race._id}`)

  //        // refetch leaguedata
  //        mutateLeagueData()
  //        // refetch eligibility data
  //        mutateEligibilityData()
  //     } catch (error) {
  //        console.log(error)
  //     }
  //  }

  //  async function leaveRace() {
  //     try {
  //        await axios.delete(`/api/leagues/race/${race._id}`)
  //        // refetch leaguedata
  //        mutateLeagueData()
  //        // refetch eligibility data
  //        mutateEligibilityData()
  //     } catch (error) {
  //        console.log(error)
  //     }
  //  }

  return (
    <div className="mr-4 inline-block w-full max-w-[350px] overflow-hidden rounded-lg bg-base-200">
      <div className="relative overflow-hidden">
        {/* status banner */}
        {/* <div
               className={`${
                  status[race.status].color
               } w-3/4 h-8 absolute z-50 flex items-center justify-center rotate-[35deg] -right-16 top-8 backdrop-blur-sm`}>
               <span>{status[race.status].msg}</span>
            </div> */}

        {/* track image */}
        {/* <img
               src={trackImage}
               // sets track image to default image
               onError={() => setTrackImage('/brand/SVGs/icon-V2.svg')}
               alt=""
               className="my-0 object-cover"
            /> */}
      </div>

      <div className="px-3">
        {/* <h4 className="mt-2">{race.config.event.track}</h4>

            <span className="whitespace-pre-wrap">{eventDate.toLocaleString()}</span>

            <div>
               <span className="opacity-50">Categories</span>
               <div className="flex flex-wrap gap-2 my-2">
                  {race.config.event.category.map((cat) => {
                     return (
                        <span
                           key={cat}
                           className="whitespace-nowrap bg-neutral-900 font-semibold px-3 rounded-full text-opacity-50 text-sm">
                           {cat}
                        </span>
                     )
                  })}
               </div>
            </div>

            <div>
               <span className="opacity-50">Riders Joined</span>
               <span className="block font-bold">{race.total_riders}</span>
            </div>

            <button
               disabled={!isEligibleToRace || !isRegOpen}
               onClick={() => {
                  if (!raceEligibilityData.race_joined) {
                     joinRace()
                  } else {
                     leaveRace()
                  }
               }}
               className={`${
                  raceEligibilityData.race_joined
                     ? 'bg-red-500 [&:not(:disabled)]:hover:bg-red-500/50'
                     : 'bg-green-500 [&:not(:disabled)]:hover:bg-green-500/50'
               } w-full my-3 rounded-md font-semibold  disabled:opacity-50 flex justify-center gap-4`}>
               <span>{raceEligibilityData.race_joined ? 'Leave' : 'Join'}</span>
               {isLoading && <Spinner />}
            </button> */}
      </div>
      <Link
        href={`/leagues/race/${race._id}`}
        className="link mx-auto my-2 flex w-fit text-sm text-green-500">
        View Details
      </Link>
    </div>
  )
}
