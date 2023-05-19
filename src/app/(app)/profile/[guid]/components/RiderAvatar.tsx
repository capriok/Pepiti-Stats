import Image from 'next/image'

export default function RiderAvatar({ rider }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="indicator avatar">
        <span className={`badge indicator-item ${rider.online ? 'badge-primary' : 'badge-error'}`}>
          {rider.online ? 'Online' : 'Offline'}
        </span>
        {rider.avatar ? (
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
              <span className="text-3xl">{rider.name.slice(0, 2)}</span>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex gap-2 font-semibold md:text-2xl">{rider.name}</div>
        {rider.donation > 0 && (
          <Image
            src="/assets//brand/SVGs/flag.svg"
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
