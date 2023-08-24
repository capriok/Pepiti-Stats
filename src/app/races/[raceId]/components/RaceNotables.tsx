import Link from "next/link"
import { Card, CardContent } from "~/ui/Card"
import MMRPill from "~/components/pills/MMRPill"
import RankTrophy from "~/components/pills/RankTrophy"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

interface Props {
  race: Race
}

export default function RaceNotables({ race }: Props) {
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
    <Card className="xl:w-[40%]">
      <CardContent>
        <div className="my-4 flex justify-center text-xl font-semibold">Podium</div>
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
              <RankTrophy rank={2} size={16} />
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
              <RankTrophy rank={3} size={16} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}
