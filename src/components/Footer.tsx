import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer({ user }) {
  const date = new Date()
  const authGuid = user._id

  const isSignedIn = !!user._id

  const userLinks = isSignedIn ? (
    <>
      <Link href={`/profile/${authGuid}`} className="link link-hover">
        Profile
      </Link>
      <Link href={`/profile/${authGuid}/races`} className="link link-hover">
        Races
      </Link>
      <Link href={`/profile/${authGuid}/records`} className="link link-hover">
        Records
      </Link>
    </>
  ) : (
    <Link
      href="https://pepiti.com/stats/api/v0/steam_login"
      target="_blank"
      referrerPolicy="origin">
      Sign in
    </Link>
  )

  return (
    <footer className="p-10 bg-base-200 text-base-content mt-5">
      <div className="footer mx-auto max-w-[1500px]">
        <div>
          <Image src="/assets/brand/SVGs/icon-V2.svg" width={120} height={120} alt="" />
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
          <Link href="/dashboard" className="link link-hover">
            Dashboard
          </Link>
          <Link href="/leagues" className="link link-hover">
            Leagues
          </Link>
          <Link href="/races" className="link link-hover">
            All Races
          </Link>
        </div>
        <div>
          <span className="footer-title">User</span>
          {userLinks}
        </div>
      </div>
    </footer>
  )
}
