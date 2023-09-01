"use client"

import { useUserContext } from "~/providers/UserProvider"
import BanRiderDialog from "~/components/dialogs/BanRiderDialog"
import UnbanRiderDialog from "~/components/dialogs/UnbanRiderDialog"

interface Props {
  rider: RiderProfile
}

export default function AdminControls({ rider }: Props) {
  const user = useUserContext()
  if (!user.isAdmin) return <></>

  return (
    <div className="mb-2 flex justify-end">
      {rider.banned ? (
        <UnbanRiderDialog guid={rider._id} name={rider.name} reason={rider.banned_by} />
      ) : (
        <BanRiderDialog guid={rider._id} name={rider.name} />
      )}
    </div>
  )
}
