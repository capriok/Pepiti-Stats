import Api from '~/api'
import PageHeader from '~/components/PageHeader'
import { Pill } from '~/components/pills/Pill'
import Blacklists from '../admin/blacklists/components/Blacklists'

export const metadata = {
  title: 'Pepiti | Blacklists',
  description: 'View and look up riders on the Safety Rating and Global Blacklists',
}

export default async function Page() {
  const blacklistSR = await Api.GetBlackListSR()
  const blacklistNonSR = await Api.GetBlackListNonSR()

  return (
    <>
      <PageHeader title="Blacklists" extra="Be sure to check the Global and SR Blacklist" />
      <Blacklists
        isAdmin={false}
        blacklistSR={blacklistSR.riders.filter((r) => r.banned_by === 'SR')}
        blacklistNonSR={blacklistNonSR.riders}
      />
    </>
  )
}
