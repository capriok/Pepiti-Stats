"use client"

import Image from "next/image"
import Link from "next/link"
import RiderLink from "./RiderLink"
import ThemeSwitch from "./ThemeSwitch"

interface Props {
  user: User
}

export default function Footer({ user }: Props) {
  const date = new Date()

  return (
    <footer className="mt-10 bg-base-200 p-10">
      <div className="footer mx-auto max-w-[1400px]">
        <div>
          <Image src="/assets/brand/pepiti-logo.svg" width={120} height={120} alt="pepiti_brand" />
          <div>
            <div className="flex gap-2">
              Copyright © {date.getFullYear()}{" "}
              <RiderLink href={`/profile/FF01100001013A65F0`} name="Pepiti" />
            </div>
            <div className="my-1">All rights reserved</div>
            <div className="flex gap-2">
              Powered by <RiderLink href={`/profile/FF011000010B64EBF5`} name="Tooky" /> and{" "}
              <RiderLink href={`/profile/FF011000010513D5FF`} name="PDR" />
            </div>
            <br />
          </div>
        </div>
        <div>
          <span className="footer-title">Theme</span>
          <div className="flex gap-2">
            <ThemeSwitch withLabel />
          </div>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <Link href="/dashboard" className="link-hover link">
            Dashboard
          </Link>
          <Link href="/records" className="link-hover link">
            Records
          </Link>
          <Link href="/races" className="link-hover link">
            Races
          </Link>
          <Link href="/leagues" className="link-hover link">
            Leagues
          </Link>
        </div>
        <div>
          <span className="footer-title">Profile</span>
          {user.guid ? (
            <>
              <Link href={`/profile/${user.guid}`} className="link-hover link">
                Profile
              </Link>
              <Link href={`/profile/${user.guid}?tab=races`} className="link-hover link">
                Recent Races
              </Link>
              <Link href={`/profile/${user.guid}/?tab=records`} className="link-hover link">
                My Records
              </Link>
              <Link href={`/profile/${user.guid}/?tab=leagues`} className="link-hover link">
                My Leagues
              </Link>
            </>
          ) : (
            <Link
              href="https://pepiti.com/stats/api/v0/steam_login"
              target="_blank"
              referrerPolicy="origin"
            >
              Sign in
            </Link>
          )}
        </div>
        <div>
          <span className="footer-title">Donations</span>
          <div>Help pay for services you enjoy</div>
          <div className="btn-ghost btn-sm btn bg-secondary/80 normal-case text-white hover:bg-secondary">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://paypal.me/pepitisdevs?country.x=US&locale.x=en_US`}
            >
              Donate to Pepiti.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
