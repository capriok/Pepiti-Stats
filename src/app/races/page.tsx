import Api from '~/api/api'
import PageHeader from '~/components/PageHeader'

export default async function Page() {
  const races = await Api.GetRecentRaces()

  console.log(races)

  return (
    <>
      <PageHeader title="Races" />
    </>
  )
}
