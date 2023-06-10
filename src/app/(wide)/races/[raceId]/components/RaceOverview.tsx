import Link from "next/link"
import useSwr from "swr"
import RiderAvatar from "~/app/(app)/profile/[guid]/components/RiderAvatar"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import RankTicTac from "~/components/pills/RankTicTac"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

interface Props {
  race: Race
  winner: Racer
}

export default function RaceOverview({ race }: Props) {
  console.log("%cRace", "color: steelblue", race)

  return (
    <div className="my-5 flex flex-col gap-5 xl:my-6 xl:flex-row">
      <WinnerCircle race={race} />
      <RaceNotables race={race} />
    </div>
  )
}

function WinnerCircle({ race }: { race: Race }) {
  const { data: winner, isLoading } = useSwr(`/rider/${race.winner.guid}`)
  const loadingWinner = {
    name: race.winner.name,
    avatar: "",
    online: false,
    donation: 0,
  }

  return (
    <div className="card card-body w-full bg-base-200 p-0 shadow-md xl:w-[60%]">
      <div className="my-6 flex w-full justify-center text-3xl font-semibold">Winner Circle</div>
      <div className="min-h-[200px]">
        <RiderAvatar rider={isLoading ? loadingWinner : winner} />
      </div>
      <div>
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-2 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md font-semibold text-accent">Race Number</div>
              <div className="flex items-center text-lg text-primary">
                <RankTicTac rank={1} />
                <div className="flex gap-1">
                  <div className="text-accent"># </div>
                  <div>{race.winner.raceNumber}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-2 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md font-semibold text-accent">Category</div>
              <div className="text-lg">{race.winner.category}</div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-2 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md font-semibold text-accent">Fastest Lap</div>
              <div className="text-lg">{handleLapTimes(parseInt(race.winner.fastestLap))}</div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-2 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md font-semibold text-accent">Bike</div>
              <div className="text-lg">{race.winner.bikeNameShort}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full rounded-bl-lg rounded-br-lg bg-base-300 p-4">
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="text-md pb-2 font-semibold text-accent">MMR +/-</div>
            <div className="text-lg">
              <MMRPill mmr={race.winner.mmrGain} />
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="text-md pb-2 font-semibold text-accent">New MMR</div>
            <div className="text-lg">
              <Pill text={race.winner.newMmr} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RaceNotables({ race }: { race: Race }) {
  const riderWithSecondPlace = race.standings.find((racer) => racer.position === 2)
  const riderWithThirdPlace = race.standings.find((racer) => racer.position === 3)
  const riderWithFastestLap = race.standings.reduce(
    (fastest: any, item: any) =>
      item.fl > 0 && (!fastest || item.fl < fastest.fl) ? item : fastest,
    null
  )
  const riderWithHighestMmrGain = race.standings.reduce(
    (maxItem, currentItem) => (currentItem.mmrGain > maxItem.mmrGain ? currentItem : maxItem),
    race.standings[0]
  )

  return (
    <div className="card card-body flex w-full flex-col bg-base-200 shadow-md xl:w-[40%]">
      <div className="flex-1">
        <div className="mb-4 flex justify-center text-xl font-semibold">Podium</div>
        <div className="mb-4 flex flex-col border-b border-accent/20 pb-2">
          <div className="text-md mb-2 font-semibold text-accent">Second Place</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <div className="text-accent"># </div>
                <div className="text-primary">{riderWithSecondPlace?.raceNumber}</div>
              </div>
              <div className=" text-accent">|</div>
              <Link href={`/profile/${riderWithSecondPlace?._id}`}>
                {handleRacismSanitization(riderWithSecondPlace?.name ?? "")}
              </Link>
            </div>
            <div>
              <RankTicTac rank={2} />
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col border-b border-accent/20 pb-2">
          <div className="text-md mb-2 font-semibold text-accent">Third Place</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <div className="text-accent"># </div>
                <div className="text-primary">{riderWithThirdPlace?.raceNumber}</div>
              </div>
              <div className=" text-accent">|</div>
              <Link href={`/profile/${riderWithThirdPlace?._id}`}>
                {handleRacismSanitization(riderWithThirdPlace?.name ?? "")}
              </Link>
            </div>
            <div>
              <RankTicTac rank={3} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-4 flex justify-center text-xl font-semibold">Notable</div>
        <div className="mb-4 flex flex-col border-b border-accent/20 pb-2">
          <div className="text-md mb-2 font-semibold text-accent">Fastest Lap</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <div className="text-accent"># </div>
                <div className="text-primary">{riderWithFastestLap?.raceNumber}</div>
              </div>
              <div className=" text-accent">|</div>
              <Link href={`/profile/${riderWithFastestLap?._id}`}>
                {handleRacismSanitization(riderWithFastestLap?.name ?? "")}
              </Link>
            </div>
            <div>{handleLapTimes(parseInt(riderWithFastestLap?.fastestLap))}</div>
          </div>
        </div>
        <div className="mb-4 flex flex-col border-b border-accent/20 pb-2">
          <div className="text-md mb-2 font-semibold text-accent">Highest MMR Gainer</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex gap-1">
                <div className="text-accent"># </div>
                <div className="text-primary">{riderWithHighestMmrGain?.raceNumber}</div>
              </div>
              <div className="text-accent">|</div>
              <Link href={`/profile/${riderWithHighestMmrGain?._id}`}>
                {handleRacismSanitization(riderWithHighestMmrGain?.name ?? "")}
              </Link>
            </div>
            <MMRPill mmr={riderWithHighestMmrGain?.mmrGain} />
          </div>
        </div>
      </div>
    </div>
  )
}
