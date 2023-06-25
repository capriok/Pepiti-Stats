"use client"

import uswSwr from "swr"
import Spinner from "~/components/Spinner"

export default function DonationMarquee() {
  // const donations = [
  //   { id: '1', donator: 'Pepiti', date: '2023-01-01T00:00:00.000Z', amount: 5, currency: '$' },
  //   { id: '2', donator: 'Tooky', date: '2023-01-01T00:00:00.000Z', amount: 15, currency: '$' },
  //   { id: '3', donator: 'PDR', date: '2023-01-01T00:00:00.000Z', amount: 10, currency: '$' },
  //   { id: '4', donator: 'Other Guy', date: '2023-01-01T00:00:00.000Z', amount: 5, currency: '$' },
  // ]

  //? ... this endpoint no good for this feature. should have something similar to above data to use this
  const { data, error, isLoading } = uswSwr("/top/donators")
  if (isLoading) return <Spinner />
  const donators = data.donators.filter((d) => d.donation > 0)

  return (
    <>
      <div className="text-semibold mb-2 text-xl">Recent Donations</div>
      <div className=" grid grid-cols-4 gap-5">
        {donators.slice(0, 3).map((donation) => (
          <div key={donation.id} className=" card card-body bg-base-200 p-4">
            <div className="flex justify-between">
              <div className="text-lg">{donation.donator}</div>
              <div className="text-sm text-neutral-400">
                {new Date(donation.date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-end gap-1 text-lg">
              <div className="text-secondary">{donation.currency}</div>
              <div>{donation.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
