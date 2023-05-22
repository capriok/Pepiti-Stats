import PageHeader from '~/components/PageHeader'

export const metadata = {
  title: 'Pepiti | Leagues',
  description: 'Compete in race leagues for real prizes and bragging rights',
}

export default async function Page() {
  return (
    <>
      <PageHeader title="Leagues" wide={true} />
    </>
  )
}
