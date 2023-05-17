export default function DonationBanner() {
  return (
    <div className="bg-green-500/50 py-1 text-center text-white">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://paypal.me/pepitisdevs?country.x=US&locale.x=en_US`}
        className="hover:text-green-200 cursor-pointer">
        Help us out with a donation!
      </a>
    </div>
  )
}
