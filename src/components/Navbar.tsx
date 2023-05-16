'use client'
import { PackageIcon, ShieldIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface Link {
  displayName: string
  href: string
  icon?: React.ReactNode
}

interface Props {
  user: User
  centerLinks?: Link[]
  centerContent?: React.ReactNode
}

function NavBar(props: Props) {
  const pathname = usePathname()
  const { user, centerLinks, centerContent } = props

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
              <ShieldIcon />
            </Link>
          </li>
          <li>
            <Link href={`/blacklists`} className="flex justify-between">
              Blacklists
              <ShieldIcon />
              <PackageIcon />
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
    { displayName: 'Dashboard', href: '/dashboard', icon: <></> },
    { displayName: 'Leagues', href: '/leagues', icon: <></> },
    { displayName: 'Races', href: '/races', icon: <></> },
  ]

  const endNavLinks = endLinks.map((link: Link, idx) => {
    const isActive =
      pathname === link.href || (link.href === '/races' && pathname.includes(link.href))
        ? 'btn-active'
        : ''

    return (
      <Link
        key={idx}
        href={link.href}
        className={`mr-2 flex justify-between btn btn-sm btn-ghost normal-case ${isActive}`}>
        {link.displayName}
        {link.icon}
      </Link>
    )
  })

  const centerNavLinks = centerLinks?.map((link: Link, idx) => {
    const isActive = pathname.includes(link.href)
    return (
      <Link href={link.href} key={idx} className={`btn ${isActive ? 'btn-active' : ''}`}>
        {link.displayName}
      </Link>
    )
  })

  return (
    <div className="background sticky top-0 z-50  backdrop-blur-md ">
      <div className="navbar max-w-[1500px] mx-auto">
        <div className="navbar-start">
          <Link href="/dashboard" className="btn btn-ghost">
            <Image
              src="/assets/brand/SVGs/icon-V2.svg"
              className="h-10 w-h-10"
              alt="pepiti_brand"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="navbar-center">
          {/* If we want to put something in the center of the navbar */}
          {centerContent}
          {/* If we want center navbar links */}
          {centerNavLinks && <div className="">{centerNavLinks}</div>}
        </div>
        <div className="navbar-end">
          {/* Desktop View */}
          <div className="hidden lg:flex lg:px-1">{endNavLinks}</div>

          {/* Mobile View - Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-md rounded-btn">
              {/* <IconMenu2 /> */}
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow background rounded-box w-52 mt-4">
              <div className="lg:hidden">
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
