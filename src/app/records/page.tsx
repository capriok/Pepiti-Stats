import Link from "next/link"
import PageLayout from "~/components/PageLayout"
import { Bike, Crosshair, Crown, HardHat, Timer, Trophy } from "lucide-react"

export async function generateMetadata() {
  return {
    title: `Pepiti | Records`,
    description: "Top Records for Pepiti servers",
  }
}

export default async function Page() {
  return (
    <PageLayout
      width="app"
      header={{
        title: "Pepiti Records",
        extra: (
          <Link href="/dashboard" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <Records />
    </PageLayout>
  )
}

const Records = () => {
  return (
    <div className="grid place-items-center gap-2 md:mt-6 md:px-4">
      <div>
        <div className="mb-2 mt-6 text-xl font-semibold">Track Records</div>
        <Link href="/records/track">
          <div className="group btn flex w-[300px] justify-between  border border-accent/40 bg-base-200 text-accent shadow-md hover:border-primary hover:bg-base-200">
            <div className="dark:text-white">Fastest Laps</div>
            <Timer className="group-hover:text-primary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="mb-2 mt-6 text-xl font-semibold">World Records</div>
        <Link href="/records/riders">
          <div className="group btn flex w-[300px] justify-between  border border-accent/40 bg-base-200 text-accent shadow-md hover:border-primary hover:bg-base-200">
            <div className="dark:text-white">Record Holders</div>
            <Trophy className="group-hover:text-primary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="mb-2 mt-6 text-xl font-semibold">MMR Rankings</div>
        <Link href="/records/mmr">
          <div className="group btn flex w-[300px] justify-between  border border-accent/40 bg-base-200 text-accent shadow-md hover:border-primary hover:bg-base-200">
            <div className="dark:text-white">Matchmaking Rating</div>
            <Crown className="group-hover:text-primary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="mb-2 mt-6 text-xl font-semibold">Safety Rankings</div>
        <Link href="/records/sr">
          <div className="group btn flex w-[300px] justify-between  border border-accent/40 bg-base-200 text-accent shadow-md hover:border-primary hover:bg-base-200">
            <div className="dark:text-white">Safety Rating</div>
            <HardHat className="group-hover:text-primary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="mb-2 mt-6 text-xl font-semibold">Contacts</div>
        <Link href="/records/contacts">
          <div className="group btn flex w-[300px] justify-between  border border-accent/40 bg-base-200 text-accent shadow-md hover:border-primary hover:bg-base-200">
            <div className="dark:text-white">Contact Rankings</div>
            <Crosshair className="group-hover:text-primary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="mb-2 mt-6 text-xl font-semibold">Bikes</div>
        <Link href="/records/bikes">
          <div className="group btn flex w-[300px] justify-between  border border-accent/40 bg-base-200 text-accent shadow-md hover:border-primary hover:bg-base-200">
            <div className="dark:text-white">Bike Lap Rankings</div>
            <Bike className="group-hover:text-primary" />
          </div>
        </Link>
      </div>
    </div>
  )
}
