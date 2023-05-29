"use client"

import Image from "next/image"
import Link from "next/link"

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
          <p>
            Copyright © {date.getFullYear()} Pepiti
            <br />
            All rights reserved
            <br />
            Powered by Tooky and PDR
            <br />
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <Link href="/dashboard" className="link-hover link">
            Dashboard
          </Link>
          <Link href="/races" className="link-hover link">
            Recent Races
          </Link>
          <Link href="/leagues" className="link-hover link">
            Leagues
          </Link>
        </div>
        <div>
          <span className="footer-title">User</span>
          {user.guid ? (
            <>
              <Link href={`/profile/${user.guid}`} className="link-hover link">
                Profile
              </Link>
              <Link href={`/profile/${user.guid}/#races`} className="link-hover link">
                Races
              </Link>
              <Link href={`/profile/${user.guid}/#records`} className="link-hover link">
                Records
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
