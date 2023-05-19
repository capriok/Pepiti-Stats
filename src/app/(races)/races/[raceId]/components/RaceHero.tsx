import RiderAvatar from '~/app/(app)/profile/[guid]/components/RiderAvatar'
import MMRPill from '~/components/pills/MMRPill'
import { Pill } from '~/components/pills/Pill'
import useSwr from 'swr'
import { publicRequest } from '~/api'
import { handleLapTimes } from '~/utils/handleLapTimes'

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
    <div className="m-10 flex gap-5">
      <div className="card card-body w-[60%] bg-base-200 p-0">
        <div className="mb-5 flex w-full justify-center rounded-tl-lg rounded-tr-lg bg-base-300 p-6">
          <div className=" text-3xl font-semibold">Winner Circle</div>
        </div>

        <div className="min-h-[200px]">
          <RiderAvatar rider={isLoading ? loadingWinner : winner} />
        </div>
        <div className="p-4">
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
                <div className="text-md font-semibold text-neutral-500">Race Number</div>
                <div className="text-lg text-secondary"># {race.winner.raceNumber}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
                <div className="text-md font-semibold text-neutral-500">Category</div>
                <div className="text-lg">{race.winner.category}</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
                <div className="text-md font-semibold text-neutral-500">Fastest Lap</div>
                <div className="text-lg">{handleLapTimes(race.winner.fastestLap)}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
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
  const riderWithFastestLap = race.standings.reduce((fastestLapData, currentData) =>
    currentData.fastestLap < fastestLapData.fastestLap ? currentData : fastestLapData
  )
  const riderWithHighestMmrGain = race.standings.reduce(
    (maxItem, currentItem) => (currentItem.mmrGain > maxItem.mmrGain ? currentItem : maxItem),
    race.standings[0]
  )

  return (
    <div className="card card-body w-[40%] bg-base-200">
      <div className="text-lg font-semibold">Podium</div>
      <div className="indent-4">
        <div className="mb-2 flex flex-col">
          <div className="text-md font-semibold text-neutral-500">Second Place</div>
          <div className="flex">
            <div className="text-secondary">#{riderWithSecondPlace?.raceNumber}</div>
            <div className=" text-neutral-500/80">|</div>
            <div>{riderWithSecondPlace?.name}</div>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="text-md font-semibold text-neutral-500">Third Place</div>
          <div className="flex">
            <div className="text-secondary">#{riderWithThirdPlace?.raceNumber}</div>
            <div className=" text-neutral-500/80">|</div>
            <div>{riderWithThirdPlace?.name}</div>
          </div>
        </div>
      </div>

      <div className="text-lg font-semibold">Other Notables</div>
      <div className="indent-4">
        <div className="mb-2 flex flex-col">
          <div className="text-md font-semibold text-neutral-500">Fastest Lap</div>
          <div className="flex">
            <div className="text-secondary">#{riderWithFastestLap?.raceNumber}</div>
            <div className=" text-neutral-500/80">|</div>
            <div>{riderWithFastestLap?.name}</div>
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <div className="text-md font-semibold text-neutral-500">Highest MMR Gainer</div>
          <div className="flex">
            <div className="text-secondary">#{riderWithHighestMmrGain?.raceNumber}</div>
            <div className=" text-neutral-500/80">|</div>
            <div>{riderWithHighestMmrGain?.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
