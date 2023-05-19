import RiderAvatar from '~/app/(app)/profile/[guid]/components/RiderAvatar'
import MMRPill from '~/components/pills/MMRPill'
import { Pill } from '~/components/pills/Pill'
import RiderLink from '~/components/RiderLink'
import { handleLapTimes } from '~/utils/handleLapTimes'

interface Props {
  winner: RiderProfile
  raceSession: RaceSession
  race: any
}

export default function RaceHero({ winner, raceSession, race }: Props) {
  console.log(raceSession)
  console.log(race)

  const winnerRaceNum =
    Object.keys(race.Classification).find((raceNum) => race?.Classification[raceNum]?.Pos === 1) ??
    ''

  const winnerDetails = {
    guid: raceSession.riders[winnerRaceNum].guid ?? '',
    name: raceSession.riders[winnerRaceNum].name ?? '',
    raceNum: winnerRaceNum ?? '',
    category: raceSession.riders[winnerRaceNum].category ?? '',
    bike_name: raceSession.riders[winnerRaceNum].bike_name ?? '',
    bike_short_name: raceSession.riders[winnerRaceNum].bike_short_name ?? '',
    raceTime: race.Classification[winnerRaceNum]?.RaceTime ?? '',
    position: race.Classification[winnerRaceNum]?.Pos ?? '',
    laps: race.Classification[winnerRaceNum]?.Laps ?? '',
    penalties: race.Classification[winnerRaceNum]?.Penalty ?? '',
    fastestLap: race.FastestLap[winnerRaceNum] ?? '',
    newMmr: race?.MMR[winnerRaceNum].old_MMR + race?.MMR[winnerRaceNum].total ?? '',
    mmrGain: race?.MMR[winnerRaceNum].total ?? '',
    bpp: race?.MMR[winnerRaceNum].BPP ?? '',
    fl: race?.MMR[winnerRaceNum].FL ?? '',
    hs: race?.MMR[winnerRaceNum].HS ?? '',
    nrb: race?.MMR[winnerRaceNum].NRB ?? '',
    prb: race?.MMR[winnerRaceNum].PRB ?? '',
  }
  console.log(winnerDetails)

  // const fastestLapRaceNum = race && Object.keys(race?.FastestLap)[0]

  // const { raceNum: fastestRaceNum, lap_time: fastestLapTime } =
  //   race &&
  //   Object.keys(race?.FastestLap).reduce(
  //     (acc, curr) => {
  //       if (race?.FastestLap[curr] < acc.lap_time) {
  //         acc = { raceNum: curr, lap_time: race?.FastestLap[curr] }
  //         return acc
  //       }
  //       return acc
  //     },
  //     {
  //       raceNum: Object.keys(race?.FastestLap)[0],
  //       lap_time: race?.FastestLap[Object.keys(race?.FastestLap)[0]],
  //     }
  //   )
  // const fastestLapDetails = fastestRaceNum &&
  //   fastestLapTime && {
  //     name: race.riders[fastestRaceNum].name,
  //     lap_time: fastestLapTime,
  //     bike_short_name: race.riders[fastestRaceNum].bike_short_name,
  //   }

  console.log(winner)

  return (
    <div className="m-10 flex gap-5">
      <div className="card card-body w-[60%] bg-base-200 p-0 pt-10">
        <RiderAvatar rider={winner} />
        <div className="p-4">
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Name</div>
                <div className="text-lg">{winnerDetails.name}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Race #</div>
                <div className="text-lg">{winnerDetails.raceNum}</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Category</div>
                <div className="text-lg">{winnerDetails.category}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Bike</div>
                <div className="text-lg">{winnerDetails.bike_short_name}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex w-full rounded-bl-lg rounded-br-lg bg-base-300 p-4">
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="text-md font-semibold text-neutral-500">MMR Gain</div>
              <div className="text-lg">
                <Pill text={winnerDetails.mmrGain} color="neutral" />
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="text-md font-semibold text-neutral-500">New MMR</div>
              <div className="text-lg">
                <MMRPill mmr={winnerDetails.newMmr} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body w-[40%] bg-base-200">
        <div>Notable others</div>
      </div>
    </div>
  )
}

export function RaceHeroOld({ raceSession, race }) {
  const winnerRaceNum = race
    ? Object.keys(race.Classification).find((raceNum) => race?.Classification[raceNum].Pos === 1)
    : '-'

  const winnerDetails = winnerRaceNum && {
    guid: race.riders[winnerRaceNum].guid,
    name: race.riders[winnerRaceNum].name,
    newMmr: race?.MMR[winnerRaceNum].old_MMR + race?.MMR[winnerRaceNum].total,
    mmrGain: race?.MMR[winnerRaceNum].total,
    bpp: race?.MMR[winnerRaceNum].BPP,
    fl: race?.MMR[winnerRaceNum].FL,
    hs: race?.MMR[winnerRaceNum].HS,
    nrb: race?.MMR[winnerRaceNum].NRB,
    prb: race?.MMR[winnerRaceNum].PRB,
    category: race.riders[winnerRaceNum].category,
    bike_name: race.riders[winnerRaceNum].bike_name,
    bike_short_name: race.riders[winnerRaceNum].bike_short_name,
  }

  // const fastestLapRaceNum = race && Object.keys(race?.FastestLap)[0]

  const { raceNum: fastestRaceNum, lap_time: fastestLapTime } =
    race &&
    Object.keys(race?.FastestLap).reduce(
      (acc, curr) => {
        if (race?.FastestLap[curr] < acc.lap_time) {
          acc = { raceNum: curr, lap_time: race?.FastestLap[curr] }
          return acc
        }
        return acc
      },
      {
        raceNum: Object.keys(race?.FastestLap)[0],
        lap_time: race?.FastestLap[Object.keys(race?.FastestLap)[0]],
      }
    )
  const fastestLapDetails = fastestRaceNum &&
    fastestLapTime && {
      name: race.riders[fastestRaceNum].name,
      lap_time: fastestLapTime,
      bike_short_name: race.riders[fastestRaceNum].bike_short_name,
    }

  return (
    <>
      {race && winnerDetails && (
        <div className="flex max-h-full flex-1 flex-col justify-around gap-20 overflow-hidden">
          <div className="flex flex-col md:mx-auto md:w-2/3">
            <div className="mx-auto flex w-3/4 flex-col gap-2 rounded-t-lg border-b-2 border-neutral-700 bg-neutral-800/40 p-6">
              <p className="text-center opacity-50">Race Winner</p>
              <RiderLink href={`/profile/${winnerDetails?.guid}`}>
                {winnerDetails?.name + ' #' + winnerRaceNum}
              </RiderLink>
              <div className="w-100 align-center mt-[10px] flex justify-center">
                <div className="align-center flex flex-1 justify-center">
                  <p className="my-auto mr-2 text-center text-sm opacity-50">New MMR:</p>
                  <div className="flex justify-center">
                    {/* <Pill size="base" text={winnerDetails.newMmr} color="neutral" /> */}
                  </div>
                </div>
                <div className="align-center flex flex-1 justify-center">
                  <p className="my-auto mr-2 text-center text-sm opacity-50">MMR Gain:</p>
                  <div className="flex justify-center">
                    {/* <Pill
                                 size="base"
                                 text={
                                    winnerDetails.mmrGain > 0
                                       ? '+' + winnerDetails.mmrGain
                                       : winnerDetails.mmrGain
                                 }
                                 color={handleMMRColor(winnerDetails.mmrGain)}
                              /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-center">
              <div className="flex w-full flex-col justify-center gap-2 rounded-l-lg bg-neutral-800/40 p-4">
                <h3 className="mx-auto opacity-50">Category</h3>
                <h2 className="mx-auto text-2xl font-semibold">{winnerDetails?.category}</h2>
              </div>
              <div className="flex w-full flex-col justify-center gap-2 rounded-r-lg border-l-2 border-neutral-700 bg-neutral-800/40 p-4">
                <div className="flex justify-center">
                  <p className="opacity-50">Bike</p>
                </div>
                <h2 className="mx-auto w-full text-2xl font-semibold">
                  {winnerDetails?.bike_name}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-center md:mx-auto md:w-2/4">
            <div className="mx-auto flex w-2/4 flex-col gap-2 rounded-lg bg-neutral-800/40 p-4">
              <div className="mx-auto mb-2 w-fit rounded-lg bg-neutral-800/40 md:w-2/3 lg:w-fit">
                <p className="opacity-50">Fastest Lap</p>
                <p className="text-2xl font-semibold">{fastestLapDetails?.name}</p>
              </div>
              <div className="mx-auto">
                <p className="opacity-50">Time</p>
                <h2 className="text-2xl font-semibold">
                  {handleLapTimes(fastestLapDetails?.lap_time!)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
