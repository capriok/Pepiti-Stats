import { GetRider } from "~/api"
import GetAuthUser from "~/api"
import Pill from "~/components/pills/Pill"
import BanAppealForm from "./components/BanAppealForm"
import PageLayout from "~/components/PageLayout"

export const metadata = {
  title: "Pepiti | Ban Appeal",
  description: "Appeal a ban from online racing",
}

export default async function Page() {
  const user = await GetAuthUser()
  const rider = await GetRider(user.guid)

  return (
    <PageLayout
      width="app"
      header={{
        title: "Ban Appeal",
        extra: (
          <Pill
            color="secondary"
            text={
              <div className="text-sm">Plead your ban appeal, An admin will review it soon</div>
            }
          />
        ),
      }}
    >
      {/* @ts-expect-error */}
      <BanAppealForm reason={rider.banned_by} />
    </PageLayout>
  )
}
