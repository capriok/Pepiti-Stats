import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import Result from '~/components/Result'
import useAuthUser from '~/utils/useAuthUser'

export default async function AdminLayout({ children }) {
  const user = await useAuthUser()
  const isAdmin = user.isAdmin

  if (!isAdmin) return redirect('/dashboard')

  return children
}
