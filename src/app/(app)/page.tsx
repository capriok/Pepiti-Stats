import Link from "next/link"
import Image from "next/image"
import getAuthUser from "~/api/getAuthUser"
import { ChevronsDownIcon } from "lucide-react"
import { ThemedImage } from "~/components/ThemedImage"

export const metadata = {
  title: "Pepiti | Home",
  description:
    "Access race stats in real-time, host and join leagues, connect with fellow races through social integrations, and compete with rivals through global leaderboards",
}

export default async function Page() {
  // TODO: change images to light when light mode is set.
  const user = await getAuthUser()
  const ctaLink = user.guid
    ? `/profile/${user.guid}`
    : "https://pepiti.com/stats/api/v0/steam_login"

  return (
    <>
      <div className="flex min-h-screen flex-col items-center lg:justify-evenly">
        <div className="flex w-full max-w-full flex-col lg:flex-row">
          <div className="">
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

          <ThemedImage
            src="/assets/screenshots/dashboard-d.jpg"
            className="rounded-lg border border-neutral-500"
            width={600}
            height={600}
            alt="hero-dashboard"
            placeholder="blur"
            blurDataURL="/assets/screenshots/dashboard-d.jpg"
            priority={true}
          />
        </div>
        <div className="mt-10 lg:mt-0">
          <ChevronsDownIcon size="60" className="animate-bounce opacity-50" />
        </div>
      </div>

      {/* Profile Features */}
      <section className="flex min-h-[60vh] flex-col items-center">
        <div className="flex flex-wrap items-center gap-10 md:flex-nowrap">
          <h1 className="basis-1/2 text-5xl font-bold">Your Profile</h1>

          <p className="text-neutral-400">
            All you have to do is link your Steam profile to get direct access to your very own
            profile. Here you will find every single trackable stat you have logged on one of our
            servers.
          </p>

          <Link href={ctaLink} className="btn-outline btn-secondary btn-block btn md:basis-1/5">
            show me my profile
          </Link>
        </div>

        <div className="my-20 flex flex-row gap-10 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3">
            <figure>
              <ThemedImage
                className="rounded-lg border border-neutral-500"
                src="/assets/screenshots/profile-stats-d.jpg"
                width="1000"
                height="1000"
                alt="stats"
              />
            </figure>
            <div className="rounded-2xl bg-base-200 p-5 lg:order-4">
              <h2 className="card-title">Personal Stats</h2>
              <p className="text-neutral-400">
                A quick overview of the important stats you have logged in our servers.
              </p>
            </div>

            <figure>
              <ThemedImage
                className="rounded-lg border border-neutral-500"
                src="/assets/screenshots/mmr-history-d.jpg"
                width="1000"
                height="1000"
                alt="mmr history"
              />
            </figure>
            <div className="rounded-2xl bg-base-200 p-5 lg:order-5">
              <h2 className="card-title">MMR History</h2>
              <p className="text-neutral-400">
                A graph showing how your MMR (Matchmaking Ranking) has changed over time.
              </p>
            </div>

            <figure>
              <ThemedImage
                className="rounded-lg border border-neutral-500"
                src="/assets/screenshots/profile-breakdowns-d.jpg"
                width="1000"
                height="1000"
                alt="breakdowns"
              />
            </figure>
            <div className="rounded-2xl bg-base-200 p-5 lg:order-6">
              <h2 className="card-title">Profile Breakdowns</h2>
              <p className="text-neutral-400">
                A section full of tables that breakdown all of the majority of your race data from
                recent races to what leagues you have joined.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Race Statistics and Analytics */}
      <section>
        <div className="hero min-h-[60vh]">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <ThemedImage
              className="rounded-lg border border-neutral-500"
              height="600"
              width="600"
              src="/assets/screenshots/races-d.jpg"
              alt="race analytics"
            />
            <div className="basis-1/3">
              <h1 className="text-5xl font-bold">Race Statistics and Analytics</h1>
              <p className="py-6 text-neutral-400">
                Full breakdowns of every race that is logged into our systems. Podium racers get
                displayed proudly at the top and just below will be the leaderboards as well as a
                analysis of how the MMR was calculated.
              </p>
              <Link href="/races" className="btn-outline btn-secondary btn">
                Let&apos;s see the analytics
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Leagues */}
      <section>
        <div className="hero">
          <div className="hero-content flex-col-reverse lg:flex-row-reverse lg:justify-evenly">
            <div className="basis-1/3">
              <h1 className="text-5xl font-bold">Leagues</h1>
              <p className="py-6 text-neutral-400">
                When you have linked your Steam profile to our site, you will gain access to
                Leagues. Leagues can have minimum rider requirements so that you can know who you
                are going up against. Trophies will be added to your profile, for you to show off.
                The league organizer might even provide a monetary prize for the winner!
              </p>
              <Link href="/leagues" className="btn-outline btn-secondary btn">
                Sign me up!
              </Link>
            </div>

            <div>
              <ThemedImage
                height="400"
                width="400"
                src="/assets/screenshots/leagues-d.jpg"
                alt="leagues"
                className="relative right-20 top-10 rounded-lg border border-neutral-500 shadow-2xl"
              />
              <ThemedImage
                height="400"
                width="400"
                src="/assets/screenshots/leaguerace-d.jpg"
                alt="league race"
                className="relative rounded-lg border border-neutral-500 shadow-2xl"
              />
              <ThemedImage
                height="400"
                width="400"
                src="/assets/screenshots/league-d.jpg"
                alt="league"
                className="relative bottom-10 right-10 rounded-lg border border-neutral-500 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Blacklists */}
      <section>
        <div className="hero min-h-[60vh]">
          <div className="hero-content flex-col lg:flex-row-reverse lg:justify-evenly">
            <div>
              <ThemedImage
                height="400"
                width="400"
                src="/assets/screenshots/blacklists-d.jpg"
                alt="leagues"
                className="rounded-lg border border-neutral-500 shadow-2xl"
              />
            </div>

            <div className="basis-1/3">
              <h1 className="text-5xl font-bold">Blacklists</h1>
              <p className="py-6 text-neutral-400">
                You <span className="text-error">don&apos;t</span> want to end up here but,
                inevitably, some of you will. You can find out why you are banned along with some
                details about the rider&apos;s profile. For example, an SR ban would be interersted
                in where their SR level is at, if it is under 900 you will have to race in
                no-contact servers to get it back above 950.
              </p>
              <Link href="/blacklists" className="btn-outline btn-secondary btn">
                I wanna see who I can shame
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <Link
          href="/dashboard"
          className="relative mx-auto mt-10 block w-full overflow-hidden rounded-lg bg-primary p-10 outline outline-0 outline-offset-2 outline-primary  hover:bg-secondary/70 hover:outline-1 lg:mt-0 lg:w-3/4"
        >
          <span className="mb-3 block text-3xl font-extrabold leading-relaxed text-base-200 lg:text-4xl">
            Ready to join the
            <span className="glass rounded-xl px-2 py-1 text-neutral-200">competition?</span>
          </span>
          <span className="text-2xl font-light lg:text-3xl">Click Here</span>

          <ThemedImage
            src="/assets/brand/pepiti-logo-d.svg"
            height="150"
            width="150"
            alt="logo"
            className="absolute -bottom-4 -right-6"
          />
        </Link>
      </section>
    </>
  )
}
