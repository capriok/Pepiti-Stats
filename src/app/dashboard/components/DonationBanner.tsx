"use client"

export default function DonationBanner() {
  return (
    <div className="mb-12 bg-primary/80 py-1 text-center text-white dark:bg-primary/60">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://paypal.me/pepitisdevs?country.x=US&locale.x=en_US`}
        className="cursor-pointer hover:text-green-200"
      >
        Help us out with a donation!
      </a>
    </div>
  )
}
