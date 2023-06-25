"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/ui/NavigationMenu"
import cn from "~/utils/cn"
import { LogOut, ShieldAlert, User, User2 } from "lucide-react"
import ThemeSwitch from "./ThemeSwitch"

interface Props {
  user: User
}

function NavBar({ user }: Props) {
  const pathname = usePathname()

  return (
    <>
      <div className="sticky top-0 z-50 h-[65px] max-h-[65px] min-h-[65px] border-b border-accent/40 bg-base-200 backdrop-blur-lg">
        <div className="navbar">
          <div className="flex w-full justify-between">
            <Link
              href={pathname === "/dashboard" ? "/" : "/dashboard"}
              className="btn-ghost btn relative border-none hover:bg-base-100 hover:text-white"
            >
              <Image
                src="/assets/brand/pepiti-logo.svg"
                alt="pepiti_brand"
                priority={true}
                width={60}
                height={60}
              />
            </Link>
            <div className="mr-2 flex w-fit justify-end gap-2 md:mr-0">
              {pathname === "/" ? <LandingNavigation /> : <AppNavigation user={user} />}
              <div className="hidden md:flex">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar

interface Item {
  href: string
  title: any
  description?: string
  admin?: boolean
}

function AppNavigation({ user }) {
  const racingItems: Array<Item> = [
    {
      href: "/races",
      title: "Races",
      description: "Real-time post race statistics, analysis, and rider accolades.",
    },
    {
      href: "/leagues",
      title: "Leagues",
      description: "Compete in race leagues to win real prizes and profile badges.",
    },
  ]

  const featureItems: Array<Item> = [
    {
      href: "/records",
      title: "Top Records",
      description: "Explore top records statistics and analyze intuitive data.",
    },
    {
      href: "/blacklists",
      title: "Blacklists",
      description: "View Global and SR Blacklist, dont end up on these lists.",
    },
    {
      href: "/report",
      title: "Report Rider",
      description: "Report riders with image/video proof for administrative review.",
    },
  ]

  const profileItems: Array<Item> = [
    {
      href: `/profile/${user.guid}`,
      title: (
        <div className="-m-3 flex flex-col rounded-lg bg-base-100 p-4">
          <div className="flex w-full items-center justify-between">
            <div>Profile</div>
            <Image src={user.avatar} alt="avatar" width={28} height={28} className="rounded-full" />
          </div>
          <div className="flex text-xs">
            {user.isAdmin ? (
              <div className="text-secondary dark:text-secondary-content">Admin</div>
            ) : (
              <div className="text-accent/60">User</div>
            )}
          </div>
        </div>
      ),
    },
    {
      href: `/admin`,
      title: (
        <div className="flex w-full justify-between gap-4">
          <div>Administration</div>
          <ShieldAlert size={20} />
        </div>
      ),
      admin: true,
    },
    {
      href: `/signout`,
      title: (
        <div className="flex w-full justify-between gap-4">
          <div>Sign out</div>
          <LogOut size={20} />
        </div>
      ),
    },
  ]

  const ProfileDropdown = ({ label }) => {
    if (user.guid)
      return (
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {label}
            {/* <Image src={user.avatar} alt="avatar" width={24} height={24} className="rounded-full" /> */}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col justify-center gap-2 p-2 sm:w-[300px] lg:w-[300px]">
              {profileItems.map((item) => {
                if (item.admin && !user.isAdmin) return <></>
                return <LinkItem key={item.title} title={item.title} href={item.href} />
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )

    return (
      <NavigationMenuItem>
        <Link href="https://pepiti.com/stats/api/v0/steam_login" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sign In</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    )
  }

  const menuContentCn = "flex flex-col justify-center gap-2 p-4 lg:w-[300px]"

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* DESKTOP */}
        <div className="hidden md:flex">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Racing</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={menuContentCn}>
                {racingItems.map((item) => (
                  <LinkItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </LinkItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={menuContentCn}>
                {featureItems.map((item) => (
                  <LinkItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </LinkItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <ProfileDropdown label={user.name.slice(0, 12)} />
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={menuContentCn}>
                {racingItems.map((item) => (
                  <LinkItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </LinkItem>
                ))}
                {featureItems.map((item) => (
                  <LinkItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </LinkItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <ProfileDropdown label={<User2 size={20} />} />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function LandingNavigation() {
  const featureItems: { title: string; href: string; description: string }[] = [
    {
      title: "Top Records",
      href: "/records",
      description: "Explore top records from fastest laps to most contacts.",
    },
    {
      title: "Races",
      href: "/races",
      description: "Real-time post race statistics, analysis, and rider accolades.",
    },
    {
      title: "Leagues",
      href: "/leagues",
      description: "Compete in race leagues to win real prizes and profile badges.",
    },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 rounded-lg bg-base-100">
                <NavigationMenuLink asChild>
                  <a
                    href="/dashboard"
                    className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                  >
                    <Image
                      src="/assets/brand/pepiti-flag.svg"
                      alt="pepiti_brand"
                      priority={true}
                      width={24}
                      height={24}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">Pepiti</div>
                    <p className="text-sm leading-tight text-accent">
                      A community of racing and statistic enthusiasts
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {featureItems.map((item) => (
                <LinkItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </LinkItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const LinkItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href!}
            className={cn(
              "hover:text-base-100-foreground focus:text-base-100-foreground block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-base-100 focus:bg-base-100",
              className
            )}
            {...props}
          >
            <div className="text-md font-medium leading-none">{title}</div>
            {children && (
              <p className="text-muted-foreground line-clamp-2 pt-1 text-sm leading-snug text-accent">
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
LinkItem.displayName = "LinkItem"
