import Image from "next/image"
import Link from "next/link"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

export default function RiderAvatar({ rider }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="indicator avatar min-h-[128px]">
        <span
          className={`badge indicator-item text-white ${
            rider.online ? "badge-secondary" : "badge-error"
          }`}
        >
          {rider.online ? "Online" : "Offline"}
        </span>
        {rider.avatar && !rider.avatar.includes(optedOutAvatar) ? (
          <Image
            priority={true}
            width={120}
            height={120}
            src={rider?.avatar}
            className="rounded-md"
            alt="riderAvatar"
          />
        ) : (
          <div className="placeholder avatar">
            <div className="h-[120px] w-[120px] rounded-md bg-neutral-focus text-neutral-content">
              <div className="text-3xl">{rider.name.slice(0, 2)}</div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2 font-semibold md:text-2xl">
          <Link href={`/profile/${rider._id}`}>{handleRacismSanitization(rider.name)}</Link>
        </div>
        {rider.donation > 0 && (
          <Image
            src="/assets/brand/donation-flag.svg"
            className="h-6 w-6"
            alt=""
            width={10}
            height={10}
          />
        )}
      </div>
    </div>
  )
}

const optedOutAvatar = "fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full"
