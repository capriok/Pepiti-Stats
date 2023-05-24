import PageHeader from '~/components/PageHeader'
import LeagueRaceSignup from '../../_components/LeagueRaceSignup'

export const metadata = {
  title: 'Pepiti | Leagues',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page() {
  return (
    <>
      <PageHeader title="League Race Signup" />
      <div className="mx-auto w-full md:w-[500px]">
        <div className="grid place-items-center">
          <LeagueRaceSignup />
        </div>
      </div>
    </>
  )
}
