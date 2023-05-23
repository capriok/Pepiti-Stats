'use client'

import useSWR from 'swr'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '~/components/Spinner'
import { publicRequest } from '~/api'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nameParam = searchParams.get('name')

  const { data, isLoading } = useSWR(`/rider/search/${nameParam}`, publicRequest)

  if (isLoading) {
    return (
      <div className="grid h-[75vh] w-full place-items-center">
        <Spinner />
      </div>
    )
  }
  console.log(data.results)

  const rider = data.results.find((rider) => rider.name.toLowerCase() === nameParam)

  if (rider?._id) {
    setTimeout(() => {
      return router.push(`/profile/${rider._id}`)
    }, 1500)
  }

  return (
    <div className="grid h-[75vh] w-full place-items-center">
      <div className="card card-body bg-base-200 text-xl ">
        {rider?._id ? (
          <div className="text-white">{`Redirecting to ${rider.name}'s profile...`}</div>
        ) : (
          <div className="text-error">{`No rider found matching ${nameParam}`}</div>
        )}
      </div>
    </div>
  )
}
