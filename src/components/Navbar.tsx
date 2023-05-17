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

interface Props {
  user: User
}

function NavBar(props: Props) {
  const pathname = usePathname()
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
            <Link href={`/rider-report`} className="flex justify-between">
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
        className="btn btn-ghost text-error">
        {user.guid ? 'Change User' : 'Sign In'}
      </Link>
    </>
  )

  const endLinks = [
    { displayName: 'Dashboard', href: '/dashboard', icon: <LayoutDashboardIcon /> },
    { displayName: 'Leagues', href: '/leagues', icon: <TrophyIcon /> },
    { displayName: 'Races', href: '/races', icon: <ScrollTextIcon /> },
  ]

  const endNavLinks = endLinks.map((link, idx) => {
    const isActive =
      pathname === link.href || (link.href === '/races' && pathname.includes(link.href))
        ? 'btn-active'
        : ''

    return (
      <Link
        key={idx}
        href={link.href}
        className={`mr-2 flex justify-between btn btn-sm btn-ghost normal-case ${isActive}`}>
        <div className="flex gap-2 justify-center items-center">
          {link.displayName}
          {link.icon}
        </div>
      </Link>
    )
  })

  return (
    <div className="background sticky top-0 z-50 backdrop-blur-md ">
      <div className="navbar max-w-[1500px] mx-auto">
        <div className="navbar-start">
          <Link href="/dashboard" className="btn btn-ghost">
            <Image
              priority={true}
              src="/assets/brand/SVGs/icon-V2.svg"
              className="h-10 w-h-10"
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
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-md rounded-btn">
              <MenuIcon />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-52 mt-4">
              <div className="lg:hidden bg-base-200">
                <span className="opacity-50 font-semibold py-1">Navigation</span>
                {endNavLinks}
              </div>
              {profileNavigationContent}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
