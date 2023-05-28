import { redirect } from "next/navigation"
import getAuthUser from "~/api/getAuthUser"

export default async function AdminLayout({ children }) {
  const user = await getAuthUser()
  const isAdmin = user.isAdmin

  if (!isAdmin) return redirect("/dashboard")

  return children
}
