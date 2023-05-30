import Link from "next/link"
import Image from "next/image"
import getAuthUser from "~/api/getAuthUser"
import { ChevronsDownIcon } from "lucide-react"

export const metadata = {
  title: "Pepiti | Home",
  description:
    "Access race stats in real-time, host and join leagues, connect with fellow races through social integrations, and compete with rivals through global leaderboards",
}

export default async function Page() {
  const user = await getAuthUser()
  const ctaLink = user.guid
    ? `/profile/${user.guid}`
    : "https://pepiti.com/stats/api/v0/steam_login"
  const profileDetails = [
    "Rider Stats",
    "Race Stats",
    "World Records",
    "MMR History",
    "Race Logs",
    "Personal Records",
    "Joined Leagues",
  ].map((detail) => <ProfileDetail key={detail} detail={detail} />)

  return (
    <>
      <div className="hero flex min-h-screen items-start justify-center md:items-center lg:flex-col">
        <div className="hero-content w-full max-w-full flex-1 flex-col-reverse justify-between p-1 lg:flex-row-reverse">
          <div className="w-full rounded-lg border border-accent md:mockup-window">
            <Image
              src="/assets/screenshots/dashboard-d.jpg"
              className="h-full w-full"
              width={1200}
              height={1000}
              alt="hero-dashboard"
              placeholder="blur"
              blurDataURL="/assets/screenshots/dashboard-d.jpg"
              priority={true}
            />
          </div>
          <div className="min-w-[50%]">
            <div className="mb-5 mt-5 h-[1px] w-[150px] border border-accent md:mb-10" />

            <div className="mb-5 text-4xl font-bold leading-relaxed md:text-6xl">
              Competition for <div className="text-5xl md:text-7xl">Everyone.</div>
            </div>

            <p className="my-5 text-neutral-400">
              We are a community of racing and statistic enthusiasts
            </p>
            <p className="my-5">
              Access race stats in real-time, host and join leagues, connect with fellow races
              through social integrations, and compete with rivals through global leaderboards
            </p>
            <Link href="/dashboard" className="btn-outline btn-secondary btn mb-4">
              Take me to the dashboard!
            </Link>
          </div>
        </div>
        <div className="hidden lg:mx-auto lg:flex lg:flex-1 lg:place-items-center">
          <ChevronsDownIcon size="60" className="animate-bounce opacity-50" />
        </div>
      </div>

      <div className="hero mb-40 flex items-start justify-center md:mb-0 md:min-h-[75vh] md:items-center">
        <div className="hero-content w-full max-w-full flex-1 flex-col-reverse justify-between p-1 lg:flex-row">
          <div className="w-full rounded-lg border border-accent md:mockup-window">
            <Image
              src="/assets/screenshots/profile-d.jpg"
              className="h-full w-full"
              width={1200}
              height={1000}
              alt="hero-dashboard"
            />
          </div>
          <div className="min-w-[50%] text-right">
            <div className="mb-5 text-4xl font-bold leading-relaxed md:text-6xl">
              Social Integrations
            </div>

            <p className="my-5 text-neutral-400">Link your Steam account</p>
            <p className="my-5">
              All you have to do is link your Steam profile to get direct access to your very own
              profile. Here you will find every single trackable stat you have registered on one of
              our servers.
            </p>

            <h4 className="text-lg font-bold">What you can find at your profile:</h4>
            {profileDetails}
            <Link href={ctaLink} className="btn-outline btn-secondary btn mt-5 w-1/2">
              {user.guid ? "Take me to my profile" : "Link steam profile"}
            </Link>
          </div>
        </div>
      </div>

      <div className="hero mb-40 flex items-start justify-center md:mb-0 md:min-h-[75vh] md:items-center">
        <div className="w-fdivl hero-content max-w-full flex-1 flex-col-reverse justify-between p-1 lg:flex-row-reverse">
          <div className="w-full rounded-lg border border-accent md:mockup-window">
            <Image
              src="/assets/screenshots/races-d.jpg"
              className="h-full w-full"
              width={1200}
              height={1000}
              alt="hero-dashboard"
            />
          </div>
          <div className="min-w-[50%]">
            <div className="mb-5 text-4xl font-bold leading-relaxed md:text-6xl">
              Race Statistics and Analytics
            </div>

            <p className="my-5 text-neutral-400">The hub for race breakdowns</p>
            <p className="my-5">
              Select a race to view the breakdown for every completed race. From the podium to MMR
              analysis you can see how each race stacked up against each other. The Race Standings
              provide a breakdown of the final results and the MMR Analysis provides a look into how
              the total MMR was calculated.
            </p>
            <Link href={"/races"} className="btn-outline btn-secondary btn mt-5 w-1/2">
              Let&apos;s see the breakdown
            </Link>
          </div>
        </div>
      </div>

      <div className="hero mb-40 flex items-start justify-center md:mb-0 md:min-h-[75vh] md:items-center">
        <div className="w-fdivl hero-content max-w-full flex-1 flex-col-reverse justify-between p-1 lg:flex-row">
          <div className="w-full rounded-lg border border-accent md:mockup-window">
            <Image
              src="/assets/screenshots/leagues-d.jpg"
              className="h-full w-full"
              width={1200}
              height={1000}
              alt="hero-dashboard"
            />
          </div>
          <div className="min-w-[50%] text-right">
            <div className="mb-5 text-4xl font-bold leading-relaxed md:text-6xl">
              Ranked League Racing
            </div>

            <p className="my-5 text-neutral-400">We knew global race stats wasn&apos;t enough</p>
            <p className="my-5">
              These events will allow you to race against other rider&apos;s in your class. Any
              trophies that you win will be added to your profile page for you to show off. League
              creators can set minimum requirements so you know exactly who you&apos;re up against.
            </p>
            <Link href={"/leagues"} className="btn-outline btn-secondary btn mt-5 w-1/2">
              Leagues
            </Link>
          </div>
        </div>
      </div>

      <div className="hero mb-40 flex items-start justify-center md:mb-0 md:min-h-[75vh] md:items-center">
        <div className="hero-content w-full max-w-full flex-1 flex-col-reverse justify-between p-1 lg:flex-row-reverse">
          <div className="w-full rounded-lg border border-accent md:mockup-window">
            <Image
              src="/assets/screenshots/blacklists-d.jpg"
              className="h-full w-full"
              width={1200}
              height={1000}
              alt="hero-dashboard"
            />
          </div>
          <div className="min-w-[50%]">
            <div className="mb-5 text-4xl font-bold leading-relaxed md:text-6xl">Blacklists</div>

            <p className="my-5 text-neutral-400">You don&apos;t want to end up here</p>
            <p className="my-5">
              Inevitably, some of you will end up here. You can find out why you are banned along
              with some details about the rider&apos;s profile. For example, an SR ban would be
              interersted in where their SR level is at, if it is under 900 you will have to race in
              no-contact servers to get it back above 950.
            </p>
            <Link href={"/blacklists"} className="btn-outline btn-secondary btn mt-5 w-1/2">
              Blacklists
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileDetail({ detail }) {
  return (
    <div className="mb-2 ml-auto flex w-fit items-center gap-3">
      <span className="text-base">{detail}</span>
      <input type="checkbox" checked className="checkbox-secondary checkbox checkbox-md" readOnly />
    </div>
  )
}
