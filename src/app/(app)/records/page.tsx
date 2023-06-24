import Link from "next/link"
import PageHeader from "~/components/PageHeader"
import { Bike, Crosshair, Crown, HardHat, Timer } from "lucide-react"

export async function generateMetadata() {
  return {
    title: `Pepiti | Records`,
    description: "Top Records for Pepiti servers",
  }
}

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <PageHeader
        title="Pepiti Records"
        extra={
          <Link href="/dashboard" className="no-underline">
            Go back
          </Link>
        }
      />
      <Records />
    </div>
  )
}

const Records = () => {
  return (
    <div className="grid place-items-center gap-2 md:mt-6 md:px-4">
      <div>
        <div className="my-4 text-xl font-semibold">World Records</div>
        <Link href="/records/riders">
          <div className="group btn flex w-[300px] justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Record Holders</div>
            <Timer className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="my-4 text-xl font-semibold">MMR</div>
        <Link href="/records/mmr">
          <div className="group btn flex w-[300px] justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Top MMR Rankings</div>
            <Crown className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="my-4 text-xl font-semibold">SR</div>
        <Link href="/records/sr">
          <div className="group btn flex w-[300px] justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Top SR Rankings</div>
            <HardHat className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="my-4 text-xl font-semibold">Bikes</div>
        <Link href="/records/bikes">
          <div className="group btn flex w-[300px] justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Bike Lap Totals</div>
            <Bike className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="my-4 text-xl font-semibold">Contacts</div>
        <Link href="/records/contacts">
          <div className="group btn flex w-[300px] justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Top Contact Riders</div>
            <Crosshair className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>
    </div>
  )
}
