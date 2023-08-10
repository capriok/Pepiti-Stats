"use client"

import { useUserContext } from "~/providers/UserProvider"
import BanRiderButton from "~/components/actions/BanRiderButton"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"

interface Props {
  rider: RiderProfile
}

export default function AdminControls({ rider }: Props) {
  const user = useUserContext()
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
