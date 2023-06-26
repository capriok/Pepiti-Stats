import useSwr from "swr"
import RiderAvatar from "~/app/profile/[guid]/components/RiderAvatar"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import RankTicTac from "~/components/pills/RankTicTac"
import { handleLapTimes } from "~/utils/handleLapTimes"

interface Props {
  race: Race
}

export default function WinnerCircle({ race }: Props) {
  const { data: winner, isLoading } = useSwr(`/rider/${race.winner.guid}`)
  const loadingWinner = {
    name: race.winner.name,
    avatar: "",
    online: false,
    donation: 0,
  }

  return (
    <div className="card card-body w-full rounded-lg bg-base-200 p-0 shadow-md xl:w-[60%]">
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
