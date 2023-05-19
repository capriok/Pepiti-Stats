import RiderAvatar from '~/app/(app)/profile/[guid]/components/RiderAvatar'
import MMRPill from '~/components/pills/MMRPill'
import { Pill } from '~/components/pills/Pill'
import useSwr from 'swr'
import { publicRequest } from '~/api'
import { handleLapTimes } from '~/utils/handleLapTimes'
import { handleRankColor } from '~/utils/handleRankColor'

interface Props {
  race: Race
  winner: Racer
}

export default function RaceHero({ race }: Props) {
  const loadingWinner = {
    name: race.winner.name,
    avatar: '',
    online: false,
    donation: 0,
  }

  const { data: winner, isLoading } = useSwr(`/rider/${race.winner.guid}`, publicRequest)

  return (
    <div className="my-5 flex flex-col gap-5 md:m-5 md:flex-row">
      <div className="card card-body w-full bg-base-200 p-0 md:w-[60%]">
        <div className="my-6 flex w-full justify-center text-3xl font-semibold">Winner Circle</div>

        <div className="min-h-[200px]">
          <RiderAvatar rider={isLoading ? loadingWinner : winner} />
        </div>
        <div>
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="mb-2 flex w-[30%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Race Number</div>
                <div className="flex items-center text-lg text-secondary">
                  <div className={`ml-2 mr-4 h-5 w-2 ${handleRankColor(1)}`} />
                  <div>#{race.winner.raceNumber}</div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="mb-2 flex w-[30%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Category</div>
                <div className="text-lg">{race.winner.category}</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="mb-2 flex w-[30%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Fastest Lap</div>
                <div className="text-lg">{handleLapTimes(parseInt(race.winner.fastestLap))}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="mb-2 flex w-[30%] flex-col justify-start whitespace-nowrap">
                <div className="text-md font-semibold text-neutral-500">Bike</div>
                <div className="text-lg">{race.winner.bikeNameShort}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-full rounded-bl-lg rounded-br-lg bg-base-300 p-4">
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="text-md pb-2 font-semibold text-neutral-500">MMR +/-</div>
              <div className="text-lg">
                <MMRPill mmr={race.winner.mmrGain} />
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="text-md pb-2 font-semibold text-neutral-500">New MMR</div>
              <div className="text-lg">
                <Pill text={race.winner.newMmr} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RaceNotables race={race} />
    </div>
  )
}

function RaceNotables({ race }: { race: Race }) {
  const riderWithSecondPlace = race.standings.find((racer) => racer.position === 2)
  const riderWithThirdPlace = race.standings.find((racer) => racer.position === 3)
  // const riderWithFastestLap = race.standings.reduce((fastestLapData, currentData) =>
  //   currentData.fastestLap < fastestLapData.fastestLap ? currentData : fastestLapData
  // )
  const riderWithFastestLap = race.standings.reduce(
    (fastest: any, item: any) =>
      item.fl > 0 && (!fastest || item.fl < fastest.fl) ? item : fastest,
    null
  )
  const riderWithHighestMmrGain = race.standings.reduce(
    (maxItem, currentItem) => (currentItem.mmrGain > maxItem.mmrGain ? currentItem : maxItem),
    race.standings[0]
  )

  console.log(race.standings)

  return (
    <div className="card card-body flex w-full flex-col bg-base-200 md:w-[40%]">
      <div className="flex-1">
        <div className="mb-4 flex justify-center text-xl font-semibold">Podium</div>
        <div className="mb-4 flex flex-col border-b border-neutral-500/20 pb-2">
          <div className="text-md mb-2 font-semibold text-neutral-500">Second Place</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="text-secondary">#{riderWithSecondPlace?.raceNumber}</div>
              <div className=" text-neutral-500/80">|</div>
              <div>{riderWithSecondPlace?.name}</div>
            </div>
            <div>
              <div className={`ml-2 mr-4 h-5 w-2 ${handleRankColor(2)}`} />
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col border-b border-neutral-500/20 pb-2">
          <div className="text-md mb-2 font-semibold text-neutral-500">Third Place</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="text-secondary">#{riderWithThirdPlace?.raceNumber}</div>
              <div className=" text-neutral-500/80">|</div>
              <div>{riderWithThirdPlace?.name}</div>
            </div>
            <div>
              <div className={`ml-2 mr-4 h-5 w-2 ${handleRankColor(3)}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-4 flex justify-center text-xl font-semibold">Notable</div>
        <div className="mb-4 flex flex-col border-b border-neutral-500/20 pb-2">
          <div className="text-md mb-2 font-semibold text-neutral-500">Fastest Lap</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="text-secondary">#{riderWithFastestLap?.raceNumber}</div>
              <div className=" text-neutral-500/80">|</div>
              <div>{riderWithFastestLap?.name}</div>
            </div>
            <div>{handleLapTimes(parseInt(riderWithFastestLap.fastestLap))}</div>
          </div>
        </div>
        <div className="mb-4 flex flex-col border-b border-neutral-500/20 pb-2">
          <div className="text-md mb-2 font-semibold text-neutral-500">Highest MMR Gainer</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="text-secondary">#{riderWithHighestMmrGain?.raceNumber}</div>
              <div className=" text-neutral-500/80">|</div>
              <div>{riderWithHighestMmrGain?.name}</div>
            </div>
            <MMRPill mmr={riderWithHighestMmrGain.mmrGain} />
          </div>
        </div>
      </div>
    </div>
  )
}
