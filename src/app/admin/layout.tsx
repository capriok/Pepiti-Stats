import { redirect } from "next/navigation"
import GetAuthUser from "~/api"

export default async function AdminLayout({ children }) {
  const user = await GetAuthUser()
  const isAdmin = user.isAdmin

  if (!isAdmin) return redirect("/dashboard")

  return children
}
