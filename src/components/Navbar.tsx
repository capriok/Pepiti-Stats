'use client'

import React from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import DonationBanner from "~/app/(app)/dashboard/components/DonationBanner"
import {
  FlagIcon,
  LayoutDashboardIcon,
  MenuIcon,
  MoonIcon,
  ScrollTextIcon,
  ShieldAlertIcon,
  SunIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react"

interface Props {
  user: User
}

function NavBar({ user }: Props) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const handleThemeChange = () => (theme === "light" ? setTheme("dark") : setTheme("light"))

  const secondaryLinks = [
    {
      href: `/profile/${user.guid}`,
      label: "Profile",
      icon: <UserIcon />,
      public: false,
      admin: false,
    },
    {
      href: "/report",
      label: "Report Rider",
      icon: <FlagIcon />,
      public: true,
      admin: false,
    },
    {
      href: "/blacklists",
      label: "Blacklists",
      icon: <ScrollTextIcon />,
      public: true,
      admin: false,
    },
    {
      href: "/admin",
      label: "Admin Portal",
      icon: <ShieldAlertIcon />,
      public: false,
      admin: true,
    },
    {
      label: (
        <div
          onClick={handleThemeChange}
          className="flex w-full items-center justify-between max-md:text-[16px] lg:gap-2"
        >
          <div className="max-md:text-[16px]">{theme === "light" ? "Dark Mode" : "Light Mode"}</div>
          <div>{theme === "light" ? <MoonIcon /> : <SunIcon />}</div>
        </div>
      ),
      public: true,
      admin: false,
    },
    {
      label: (
        <Link
          href="https://pepiti.com/stats/api/v0/steam_login"
          target="_blank"
          referrerPolicy="origin"
          className={`btn-ghost btn mt-[2px] h-full w-full border-none text-error ${
            user.guid ? "btn-error" : ""
          }`}
        >
          {user.guid ? "Change User" : "Sign In"}
        </Link>
      ),
      public: true,
      admin: false,
    },
  ]

  const secondaryNavLinks = secondaryLinks.map((link, idx) => {
    if (!user.guid && !link.public) return <></>
    if (!user.isAdmin && link.admin) return <></>
    return (
      <li key={idx}>
        {link.href ? (
          <Link href={link.href} className="my-[2px] flex justify-between">
            <div className="flex w-full items-center justify-between max-md:text-[16px] lg:gap-2">
              {link.label}
              {link.icon}
            </div>
          </Link>
        ) : (
          link.label
        )}
      </li>
    )
  })

  const primaryLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      href: "/races",
      label: "Races",
      icon: <ScrollTextIcon />,
    },
    {
      href: "/leagues",
      label: "Leagues",
      icon: <TrophyIcon />,
    },
  ]

  const primaryNavLinks = primaryLinks.map((link, idx) => {
    return (
      <Link
        key={idx}
        href={link.href}
        className="btn-ghost btn flex justify-between border-none font-normal normal-case hover:bg-secondary hover:text-white lg:mr-2 lg:font-semibold"
      >
        <div className="flex w-full items-center justify-between max-md:text-[16px] lg:gap-2">
          {link.label}
          {link.icon}
        </div>
      </Link>
    )
  })

  return (
    <>
      <div className="sticky top-0 z-50 bg-base-200 backdrop-blur-lg">
        <div className="navbar mx-auto max-w-[1400px]">
          <div className="navbar-start">
            <Link
              href="/dashboard"
              className="btn-ghost btn relative w-14 border-none hover:bg-secondary hover:text-white"
            >
              <Image
                priority={true}
                src="/assets/brand/pepiti-logo.svg"
                fill
                alt="pepiti_brand"
                placeholder="blur"
                blurDataURL="/assets/brand/pepiti-logo.svg"
              />
            </Link>
          </div>

          <div className="navbar-end">
            {/* Desktop View */}
            <div className="hidden lg:flex lg:px-1">{primaryNavLinks}</div>

            {/* Mobile View - Dropdown */}
            <div className="dropdown-end dropdown">
              <label
                tabIndex={0}
                className="btn-ghost rounded-btn btn border-none hover:bg-secondary hover:text-white"
              >
                <MenuIcon />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-4 w-52 bg-base-200 p-2 shadow blur-0"
              >
                <div className="bg-base-200 lg:hidden">
                  <div className="stats-desc p-2 font-semibold">Navigation</div>
                  {primaryNavLinks}
                </div>
                {secondaryNavLinks}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {pathname === "/dashboard" && <DonationBanner />}
    </>
  )
}

export default NavBar
