import GetAuthUser, { GetAdminRiderReports } from "~/api"
import ReportsPage from "./ReportsPage"

export const metadata = {
  title: "Pepiti | Admin Manager",
}

export default async function Page() {
  const user = await GetAuthUser()
  const openReports = await GetAdminRiderReports(user.token, "open")
  const closedReports = await GetAdminRiderReports(user.token, "closed")

  return (
    <ReportsPage
      openReports={openReports.results.sort(sortByDateDescending)}
      closedReports={closedReports.results.sort(sortByDateDescending)}
    />
  )
}

const sortByDateDescending = (a, b) => {
  const dateA = new Date(parseInt(a._id.slice(0, 8), 16) * 1000)
  const dateB = new Date(parseInt(b._id.slice(0, 8), 16) * 1000)
  return dateB.getTime() - dateA.getTime()
}
