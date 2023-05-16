import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse ">
          <div className="mockup-window border border-neutral w-full md:w-8/12">
            <Image
              src="/assets/dashboard.png"
              className="my-2 object-cover"
              width={700}
              height={1100}
              alt=""
              priority
            />
          </div>
          <div>
            <h1 className="mb-5 text-5xl font-bold leading-relaxed">
              Competition for{' '}
              <span className="bg-primary text-5xl font-bold text-black w-fit -pt-2 mx-auto">
                Everyone
              </span>
            </h1>

            <p className="mb-5">
              Where you can view your post race stats, join leagues, view global leaderboards, and
              keep an eye on your competition.
            </p>
            <Link href="/dashboard" className="btn btn-primary">
              Take me to the dashboard!
            </Link>
          </div>
        </div>
      </div>

      {/* Profile */}
      <h1 className="text-center">Your Profile</h1>
      <p className="text-center">
        Here you will see all of your personal stats, race stats and your MMR history.
      </p>
      <div className="mockup-window border border-neutral bg-base-300 w-fit mx-auto">
        <div className="flex justify-center bg-base-200 ">
          <Image
            src="/assets/profile.png"
            width={671}
            height={1134}
            alt=""
            className="my-0"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-20 justify-evenly">
        <div>
          <h3>Your Records</h3>
          <p>View a quick overview of all of the records you have set in game on Pepiti servers.</p>
          <div className="mockup-window border border-neutral bg-base-300 w-fit mx-auto">
            <div className="flex justify-center bg-base-200 ">
              <Image
                src="/assets/profile-records.png"
                width={671}
                height={1134}
                alt=""
                className="my-0"
                priority
              />
            </div>
          </div>
        </div>
        <div>
          <h3>Your Races</h3>
          <p>See all of the important details of each race you complete on a Pepiti server.</p>
          <div className="mockup-window border border-neutral bg-base-300 w-fit mx-auto">
            <div className="flex justify-center bg-base-200 ">
              <Image
                src="/assets/profile-races.png"
                width={600}
                height={1134}
                alt=""
                className="my-0"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="mockup-phone border-primary">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 bg-neutral-900">
                <Image
                  src="/assets/profile-mobile.png"
                  width={600}
                  height={1000}
                  alt=""
                  className="my-0"
                  priority
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold">Start Competing Today!</h1>
            <p>
              Sign up with your Steam profile and start setting some records in Pepiti servers on MX
              Bikes.
            </p>
            <Link href="/dashboard" className="btn btn-primary">
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
