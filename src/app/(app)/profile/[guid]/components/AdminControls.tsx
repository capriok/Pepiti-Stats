"use client"

import BanRiderButton from "~/components/actions/BanRiderButton"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"

interface Props {
  user: User
  rider: RiderProfile
}

export default function AdminControls({ user, rider }: Props) {
  if (!user.isAdmin) return <></>

  return (
    <div className="mb-2 flex justify-end">
      {rider.banned ? (
        <UnbanRiderButton riderId={rider._id} name={rider.name} />
      ) : (
        <BanRiderButton riderId={rider._id} name={rider.name} />
      )}
    </div>
  )
}
