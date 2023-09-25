"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "~/ui/Button"
import { Card, CardContent, CardHeader } from "~/ui/Card"

const initialState = {
  dismissed: false,
  lastDismissed: null,
}

export default function DonationBanner() {
  const pathname = usePathname()
  const isAtLandingPage = pathname === "/"

  const lsKey = "pepiti-donation-prompt"
  const localStorageJson = localStorage.getItem(lsKey)

  const [bannerState, setBannerState] = useState(
    localStorageJson ? JSON.parse(localStorageJson) : initialState
  )

  const daysToNextAppearance = Math.floor(
    (bannerState.nextAppearance - Date.now()) / (1000 * 60 * 60 * 24)
  ).toFixed(0)

  parseInt(daysToNextAppearance) < 5 &&
    console.log("%cDaysTorReappearance", "color:steelblue", {
      appearanceIn: daysToNextAppearance + " Days",
    })

  const hasBeenDismissed = bannerState.dismissed === true
  const hasBeenAMonth = bannerState.nextAppearance >= Date.now()
  const hasBeenDismissedInLastMonth = hasBeenDismissed && hasBeenAMonth

  useEffect(() => {
    if (localStorageJson === null) {
      localStorage.setItem(lsKey, JSON.stringify(initialState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(lsKey, JSON.stringify(bannerState))
  }, [bannerState])

  const onDismiss = () => {
    const dateInaMonth = Date.now() + 30 * 24 * 60 * 60 * 1000
    const dateInaMonthMidnight = new Date(dateInaMonth)
    dateInaMonthMidnight.setHours(0, 0, 0, 0)
    setBannerState({
      dismissed: true,
      nextAppearance: dateInaMonthMidnight.getTime(),
    })
  }

  if (isAtLandingPage || hasBeenDismissedInLastMonth) return <></>

  return (
    <div className="z-100 fixed bottom-0 border-t border-accent/40 bg-base-200/80">
      <Card className="relative flex min-h-[20vh] w-screen flex-col rounded-none border-none bg-base-200/90">
        <CardHeader className="relative w-full text-2xl">
          <p>We need your support at Pepiti.com!</p>
          <Button
            className="absolute right-5 top-2 p-4"
            onClick={onDismiss}
            title="Dismiss for One Month"
          >
            <X />
          </Button>
        </CardHeader>

        <hr className="border-1 mb-4 border border-accent/20" />

        <CardContent className="w-full flex-1 text-[15px] md:w-[70%]">
          We are a small team of developers who are passionate about MX Bikes and the community that
          surrounds it. We have been working on Pepiti.com since late 2022 and have been funding the
          project out of our own pockets. We are looking to expand the project and add more
          features, but we need your help to get make it come to life. If you enjoy using
          Pepiti.com, please consider donating to help us out. Any amount is greatly appreciated,
          and will award you an exclusive donator badge for your Pepiti.com profile!
        </CardContent>

        <CardContent className="mt-4">
          <Button variant="primary">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://paypal.me/pepitisdevs?country.x=US&locale.x=en_US`}
            >
              Donate to Pepiti.com
            </a>
          </Button>
        </CardContent>

        <div className="absolute -bottom-6 -right-10 hidden -rotate-12 md:inline">
          <Image
            src="/assets/brand/pepiti-logo.svg"
            alt="pepiti_brand"
            width={400}
            height={400}
            className="h-[250px] w-[250px] opacity-30 md:h-full md:w-full"
          />
        </div>
      </Card>
    </div>
  )
}
