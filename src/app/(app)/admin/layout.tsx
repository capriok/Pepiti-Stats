import { redirect } from 'next/navigation'
import useAuthUser from '~/utils/useAuthUser'

export default async function AdminLayout({ children }) {
  const user = useAuthUser()
  const isAdmin = user.isAdmin

  if (!isAdmin) return redirect('/dashboard')

  return children
}
