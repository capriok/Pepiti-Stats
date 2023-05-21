'use client'
import {
  FileWarningIcon,
  FlagIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PackageIcon,
  ScrollTextIcon,
  ShieldIcon,
  TrophyIcon,
  UserIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import DonationBanner from '~/app/(app)/dashboard/components/DonationBanner'

interface Props {
  user: User
}

function NavBar(props: Props) {
  const pathname = usePathname()
  const atDashboard = pathname === '/dashboard'

  const { user } = props

  const profileNavigationContent = (
    <>
      {user.guid && (
        <>
          <li>
            <Link href={`/profile/${user.guid}`} className="flex justify-between">
              Profile
              <UserIcon />
            </Link>
          </li>
          <li>
            <Link href={`/report`} className="flex justify-between">
              Report Rider
              <FlagIcon />
            </Link>
          </li>
          <li>
            <Link href={`/blacklists`} className="flex justify-between">
              Blacklists
              <FileWarningIcon />
            </Link>
          </li>
          {user.isAdmin && (
            <li>
              <Link href={`/admin`} className="flex justify-between">
                Admin Portal
                <ShieldIcon />
              </Link>
            </li>
          )}
        </>
      )}

      <Link
        href="https://pepiti.com/stats/api/v0/steam_login"
        target="_blank"
        referrerPolicy="origin"
        className="btn-ghost btn text-error">
        {user.guid ? 'Change User' : 'Sign In'}
      </Link>
    </>
  )

  const endLinks = [
    { displayName: 'Dashboard', href: '/dashboard', icon: <LayoutDashboardIcon /> },
    { displayName: 'Races', href: '/races', icon: <ScrollTextIcon /> },
    { displayName: 'Leagues', href: '/leagues', icon: <TrophyIcon /> },
  ]

  const endNavLinks = endLinks.map((link, idx) => {
    return (
      <Link
        key={idx}
        href={link.href}
        className="btn-ghost btn flex justify-between font-normal normal-case lg:mr-2 lg:font-semibold">
        <div className="flex w-full items-center justify-between max-md:text-[16px] lg:gap-2 ">
          {link.displayName}
          {link.icon}
        </div>
      </Link>
    )
  })

  return (
    <>
      <div className="sticky top-0 z-50 bg-base-200 backdrop-blur-md">
        <div className="navbar mx-auto max-w-[1400px]">
          <div className="navbar-start">
            <Link href="/dashboard" className="btn-ghost btn">
              <Image
                priority={true}
                src="/assets/brand/SVGs/icon-V2.svg"
                className="w-h-10 h-10"
                alt="pepiti_brand"
                width={50}
                height={50}
              />
            </Link>
          </div>

          <div className="navbar-end">
            {/* Desktop View */}
            <div className="hidden lg:flex lg:px-1">{endNavLinks}</div>

            {/* Mobile View - Dropdown */}
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost rounded-btn btn-md btn">
                <MenuIcon />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-4 w-52 bg-base-200 p-2 shadow">
                <div className="bg-base-200 lg:hidden">
                  <div className="stats-desc p-2 font-semibold">Navigation</div>
                  {endNavLinks}
                </div>
                {profileNavigationContent}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {atDashboard && <DonationBanner />}
    </>
  )
}

export default NavBar
