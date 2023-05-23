import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Pepiti | Home',
  description:
    'Access race stats in real-time, host and join leagues, connect with fellow races through social integrations, and compete with rivals through global leaderboards',
}

export default function Page() {
  return (
    <>
      <div className="hero flex min-h-screen items-start justify-center md:items-center">
        <div className="hero-content w-full  max-w-full flex-1 flex-col-reverse justify-between p-1 lg:flex-row-reverse">
          <div className="w-full rounded-lg border border-white/20 md:mockup-window">
            <Image
              src="/assets/hero-dashboard.png"
              className="my-2 h-full w-full"
              width={1200}
              height={1000}
              alt="hero-dashboard"
              priority={true}
            />
          </div>
          <div className="min-w-[50%]">
            <div className="mb-5 mt-5 h-[1px] w-[150px] border border-white/40 md:mb-10" />

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
      </div>
    </>
  )
}
