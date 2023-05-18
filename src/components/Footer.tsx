import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer({ user }) {
  const date = new Date()
  const authGuid = user._id

  const userLinks = user.guid ? (
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
      <div className="footer mx-auto max-w-[1400px]">
        <div>
          <Image
            priority={true}
            src="/assets/brand/SVGs/icon-V2.svg"
            width={120}
            height={120}
            alt="pepiti_brand"
          />
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
        <div>
          <span className="footer-title">Donations</span>
          <div>Help pay for services you enjoy</div>
          <div className="bg-secondary/60 hover:bg-secondary text-white btn btn-ghost btn-sm normal-case">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://paypal.me/pepitisdevs?country.x=US&locale.x=en_US`}>
              Donate to Pepiti.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
