import Image from "next/image"
import Link from "next/link"
import React from "react"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

interface RiderProps {
  href: string
  name: string
  donator?: boolean
}

const RiderLink: React.FC<RiderProps> = ({ href, name, donator }) => {
  return (
    <Link href={href} prefetch={false} className="text-primary">
      <div className="flex gap-2">
        {handleRacismSanitization(name)}
        {donator && (
          <Image
            src="/assets/brand/donation-flag.svg"
            alt="donation-flag"
            width={10}
            height={10}
            className="ml-2 h-4 w-4 text-purple-600"
          />
        )}
      </div>
    </Link>
  )
}

export default RiderLink
