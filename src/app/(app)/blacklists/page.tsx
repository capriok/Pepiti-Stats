import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import Blacklists from '../admin/blacklists/components/Blacklists'

export default async function Page() {
  const blacklistSR = await Api.GetBlackListSR()
  const blacklistNonSR = await Api.GetBlackListNonSR()

  return (
    <>
      <PageHeader title="Blacklists" />
      <Blacklists
        isAdmin={false}
        blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === 'SR')}
        blacklistNonSR={blacklistNonSR.riders}
      />
    </>
  )
}
