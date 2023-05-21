import Link from 'next/link'
import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import useAuthUser from '~/utils/useAuthUser'
import Blacklists from './components/Blacklists'

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
      <Blacklists
        user={user}
        blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === 'SR')}
        blacklistNonSR={blacklistNonSR.riders}
      />
    </>
  )
}
