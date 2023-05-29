"use client"

import React, { useEffect, useState } from "react"
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

/** Theme switches that avoids hydration error.
 * 
 * Check this PR, shouldn't need this when this PR is merged.
 * https://github.com/pacocoursey/next-themes/pull/171
 */
function useThemeSwitcher(): [string, (theme: string) => void] {
  const [mode, setMode] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme) setMode(theme);
  }, [theme]);

  return [mode, setTheme];
}

function NavBar({ user }: Props) {
  const [theme, setTheme] = useThemeSwitcher()
  const pathname = usePathname()

  const handleThemeChange = () => theme === "light" ? setTheme("dark") : setTheme("light")

  const secondaryLinks = [
    {
      key: "profile",
      href: `/profile/${user.guid}`,
      label: "Profile",
      icon: <UserIcon />,
      public: false,
      admin: false,
    },
    {
      key: "blacklists",
      href: "/blacklists",
      label: "Blacklists",
      icon: <ScrollTextIcon />,
      public: true,
      admin: false,
    },
    {
      key: "riderReport",
      href: "/report",
      label: "Report Rider",
      icon: <FlagIcon />,
      public: true,
      admin: false,
    },
    {
      key: "adminPortal",
      href: "/admin",
      label: "Admin Portal",
      icon: <ShieldAlertIcon />,
      public: false,
      admin: true,
    },
    {
      key: "modeToggle",
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
      hide: theme === "system" ? true : false,
    },
    {
      key: "steamSignin",
      label: (
        <Link
          href="https://pepiti.com/stats/api/v0/steam_login"
          target="_blank"
          referrerPolicy="origin"
          className={`btn-ghost btn mt-[2px] h-full w-full border-none text-error ${user.guid ? "btn-error" : ""
            }`}
        >
          {user.guid ? "Change User" : "Sign In"}
        </Link>
      ),
      public: true,
      admin: false,
    },
  ]

  const secondaryNavLinks = secondaryLinks.map((link) => {
    if (link.hide) return null
    if (!user.guid && !link.public) return null
    if (!user.isAdmin && link.admin) return null
    return (
      <li key={link.key}>
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
      key: "dashboard",
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      key: "races",
      href: "/races",
      label: "Races",
      icon: <ScrollTextIcon />,
    },
    {
      key: "leagues",
      href: "/leagues",
      label: "Leagues",
      icon: <TrophyIcon />,
    },
  ]

  const primaryNavLinks = primaryLinks.map((link) => {
    return (
      <Link
        key={link.key}
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
              className="btn-ghost btn relative border-none hover:bg-secondary hover:text-white"
            >
              <Image
                src="/assets/brand/pepiti-logo.svg"
                alt="pepiti_brand"
                priority={true}
                width={60}
                height={60}
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
