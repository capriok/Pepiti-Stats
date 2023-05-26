import PageHeader from '~/components/PageHeader'
import LeagueSignupForm from '../../_components/LeagueSignupForm'

export const metadata = {
  title: 'Pepiti | Leagues',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page({ params: { leagueId } }) {
  return (
    <>
      <PageHeader title="League  Signup" />
      <div className="mx-auto w-full md:w-[500px]">
        <div className="grid place-items-center">
          <LeagueSignupForm leagueId={leagueId} />
        </div>
      </div>
    </>
  )
}
