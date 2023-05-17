import { Suspense } from 'react'
import Api from '~/api/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import { ProfileCard } from './components/ProfileCard'

export default async function Page({ params: { guid } }) {
  const user = await useAuthUser()
  const rider = await Api.GetRider(guid)

  return (
    <>
      <PageHeader title="Rider Profile" extra={<>Links</>} />

      <ProfileCard user={user} rider={rider} />
    </>
  )
}
