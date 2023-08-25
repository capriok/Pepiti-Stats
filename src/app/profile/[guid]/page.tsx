import { GetRider, GetRiderMMRHistory } from "~/api"
import PageLayout from "~/components/PageLayout"
import AdminControls from "./components/AdminControls"
import BannedBanner from "./components/BannedBanner"
import { RiderProfile } from "./components/RiderProfile"

export async function generateMetadata({ params }) {
  const rider = await GetRider(params.guid)

  if (!rider) {
    return {
      title: `Pepiti | Profile`,
      description: "Pepiti Rider Profile Not Found.",
    }
  }

  const bannedDescription = (
    <div className="flex gap-2">
      <div>
        <div className="font-semibold text-accent">Banned</div>
        <div className="mt-2">True</div>
      </div>

      <div>
        <div className="font-semibold text-accent">Reason</div>
        <div className="mt-2">{rider.banned_by}</div>
      </div>
    </div>
  )

  const riderDescription = (
    <div className="flex flex-col gap-2">
      <div>
        <div>
          <div className="font-semibold text-accent">Rider</div>
          <div className="mt-2">{rider?.name}</div>
        </div>

        <div>
          <div className="font-semibold text-accent">Online</div>
          <div className="mt-2">{rider?.online}</div>
        </div>
      </div>

      <div>
        <div>
          <div className="font-semibold text-accent">MMR</div>
          <div className="mt-2">{rider?.MMR}</div>
        </div>

        <div>
          <div className="font-semibold text-accent">SR</div>
          <div className="mt-2">{rider?.SR}</div>
        </div>

        <div>
          <div className="font-semibold text-accent">Contacts</div>
          <div className="mt-2">{rider?.contact}</div>
        </div>
      </div>
    </div>
  )

  return {
    title: `Pepiti | Profile`,
    description: rider?.banned ? bannedDescription : riderDescription,
    openGraph: {
      images: rider.avatar ? [rider.avatar] : [],
    },
  }
}

export default async function Page({ params: { guid } }) {
  const rider = await GetRider(guid)
  const mmrHistory = await GetRiderMMRHistory(guid)

  return (
    <PageLayout
      width="app"
      header={{
        title: "Rider Profile",
        extra: <AdminControls rider={rider} />,
      }}
    >
      <BannedBanner banned={rider.banned} reason={rider.banned_by} />
      <RiderProfile rider={rider} mmrHistory={mmrHistory.MMR_updates} />
    </PageLayout>
  )
}
