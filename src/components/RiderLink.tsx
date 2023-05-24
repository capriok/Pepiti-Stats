import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface RiderProps {
  href: string
  children: string | React.ReactNode
  donator?: boolean
}

const RiderLink: React.FC<RiderProps> = ({ href, donator, children }) => {
  return (
    <Link href={href} prefetch={false} className="text-primary">
      <div className="flex gap-2">
        {children}
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
