import RiderAvatar from '~/app/(app)/profile/[guid]/components/RiderAvatar'
import MMRPill from '~/components/pills/MMRPill'
import { Pill } from '~/components/pills/Pill'
import useSwr from 'swr'
import { publicRequest } from '~/api'

interface Props {
  race: any
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
      <div className="card card-body w-[60%] bg-base-200 p-0 pt-10">
        <div className="min-h-[200px]">
          <RiderAvatar rider={isLoading ? loadingWinner : winner} />
        </div>
        <div className="p-4">
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center ">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
                <div className="text-md font-semibold text-neutral-500">Name</div>
                <div className="text-lg">{race.winner.name}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center ">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
                <div className="text-md font-semibold text-neutral-500">Race #</div>
                <div className="text-lg">{race.winner.raceNumber}</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-around">
            <div className="flex w-full flex-1 flex-col items-center ">
              <div className="flex w-[40%] flex-col justify-start whitespace-nowrap ">
                <div className="text-md font-semibold text-neutral-500">Category</div>
                <div className="text-lg">{race.winner.category}</div>
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center ">
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
              <div className="text-md font-semibold text-neutral-500">MMR Gain</div>
              <div className="text-lg">
                <MMRPill mmr={race.winner.mmrGain} />
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col items-center">
              <div className="text-md font-semibold text-neutral-500">New MMR</div>
              <div className="text-lg">
                <Pill text={race.winner.newMmr} color="neutral" />
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
