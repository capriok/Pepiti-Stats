import Link from 'next/link'
import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import Blacklists from './components/Blacklists'

export const metadata = {
  title: 'Pepiti | Admin Manager',
  description: 'View and look up riders on the Safety Rating and Global Blacklists',
}

export default async function Page() {
  const user = await useAuthUser()
  const blacklistSR = await Api.GetBlackListSR()
  const blacklistNonSR = await Api.GetBlackListNonSR()

  return (
    <>
      <PageHeader
        title="Blacklists"
        extra={
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
        }
      />
      <div className="mt-4">
        <Blacklists
          isAdmin={user.isAdmin}
          blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === 'SR')}
          blacklistNonSR={blacklistNonSR.riders}
        />
      </div>
    </>
  )
}
