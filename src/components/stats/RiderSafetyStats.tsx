"use client"

interface Props {
  rider: RiderProfile
}

export default function RiderSafetyStats({ rider }: Props) {
  return (
    <>
      <div className="mb-2 flex w-full justify-end"></div>
      <div className="stats flex w-full bg-base-100/60 text-center shadow-md dark:bg-base-100">
        <div className="stat w-full text-center">
          <div className="stat-title">Laps</div>
          <div className="stat-value pt-2 text-2xl">{rider.total_laps.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Safety Rating</div>
          <div className="stat-value pt-2 text-2xl">{rider.SR.toLocaleString()}</div>
        </div>
        <div className="stat w-full text-center">
          <div className="stat-title">Contacts</div>
          <div className="stat-value pt-2 text-2xl">{rider.contact.toLocaleString()}</div>
        </div>
      </div>
    </>
  )
}
