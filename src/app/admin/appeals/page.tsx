import Link from "next/link"
import { GetAdminRiderAppeals } from "~/api"
import GetAuthUser from "~/api"
import PageLayout from "~/components/PageLayout"
import Tabs from "~/components/Tabs"
import ClosedAppealsList from "./components/ClosedAppealsList"
import OpenAppealsList from "./components/OpenAppealList"

export const metadata = {
  title: "Pepiti | Admin Manager",
}

export default async function Page() {
  const user = await GetAuthUser()
  const openAppeals = await GetAdminRiderAppeals(user.token, "open")
  const closedAppeals = await GetAdminRiderAppeals(user.token, "closed")

  const items = [
    {
      key: "open",
      label: "Open",
      children: <OpenAppealsList appeals={[]} />,
      // children: <OpenAppealsList appeals={closedAppeals.results} />,
    },
    {
      key: "closed",
      label: "Closed",
      children: <ClosedAppealsList appeals={[]} />,
      // children: <ClosedAppealsList appeals={closedAppeals.results.sort(sortByDateDescending)} />,
    },
  ]

  return (
    <PageLayout
      width="app"
      header={{
        title: "Ban Appeals",
        extra: (
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <div className="card card-body overflow-hidden  border border-accent/40 bg-base-200 p-0 ">
        <Tabs items={items} wide={true} />
      </div>
    </PageLayout>
  )
}

const sortByDateDescending = (a, b) => {
  const dateA = new Date(parseInt(a._id.slice(0, 8), 16) * 1000)
  const dateB = new Date(parseInt(b._id.slice(0, 8), 16) * 1000)
  return dateB.getTime() - dateA.getTime()
}

const mockAppeals = [
  {
    _id: "e5bb7982a25b4c0786f819193bab5757",
    appeal: "pls unban me",
    by: {
      _id: "FF011000010B64EBF5",
      MMR: 1423,
      SR: 1181,
      name: "Tooky",
      contact: 156,
      banned: false,
      banned_by: null,
      avatar: "https://avatars.steamstatic.com/481beb0b13349d2f8216d5568b893057850174d4_full.jpg",
      type: "admin",
      donation: 0,
      online: true,
      server: "e5bb7982a25b4c0786f819193bab5757",
      seasons: [
        {
          name: "First summer",
          MMR: 1304,
          position: 2239,
        },
      ],
      races: {
        first: 9,
        second: 3,
        third: 2,
        total_races: 42,
        fastlap: 5,
        holeshot: 0,
      },
      bikes: {
        "2021 KTM 350 SX-F OEM": {
          laps: 44,
        },
        "2022 Husqvarna FC 350 OEM": {
          laps: 44,
        },
        "Husqvarna FC 450 2023": {
          laps: 23,
        },
        "Yamaha YZ250F 2023": {
          laps: 5,
        },
        "Fantic XXF 450 2023": {
          laps: 8,
        },
        "KTM 250 SX-F 2023": {
          laps: 9,
        },
        "Yamaha YZ450F 2023": {
          laps: 103,
        },
        "Fantic XX250 2023": {
          laps: 12,
        },
      },
      rider_name: "Tooky",
      world_records: {
        "MX1 OEM": 0,
        "MX1-2T OEM": 0,
        "MX2 OEM": 0,
        "MX2-2T OEM": 0,
        total: 0,
      },
      total_laps: 248,
      personal_records: 5,
      average_speed: 16.65449506048387,
      favorite_bike: {
        name: "Yamaha YZ450F 2023",
        laps: 103,
      },
    },
  },
]
