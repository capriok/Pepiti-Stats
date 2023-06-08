import { GetRider } from "~/api"
import getAuthUser from "~/api/getAuthUser"
import PageHeader from "~/components/PageHeader"
import Pill from "~/components/pills/Pill"
import BanAppealForm from "./components/BanAppealForm"

export const metadata = {
  title: "Pepiti | Ban Appeal",
  description: "Appeal a ban from online racing",
}

export default async function Page() {
  const user = await getAuthUser()
  const rider = await GetRider(user.guid)

  return (
    <div className="min-h-[90vh]">
      <PageHeader
        title="Ban Appeal"
        extra={
          <Pill
            color="secondary"
            text={
              <div className="text-sm">Plead your ban appeal, An admin will review it soon</div>
            }
          />
        }
      />
      {/* @ts-expect-error */}
      <BanAppealForm reason={rider.banned_by} />
    </div>
  )
}
