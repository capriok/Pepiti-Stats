'use client'

interface Props {}

export default function DonationMarquee({}: Props) {
  const donations = [
    { id: '1', donator: 'Pepiti', date: '2023-01-01T00:00:00.000Z', amount: 5, currency: '$' },
    { id: '2', donator: 'Tooky', date: '2023-01-01T00:00:00.000Z', amount: 15, currency: '$' },
    { id: '3', donator: 'PDR', date: '2023-01-01T00:00:00.000Z', amount: 10, currency: '$' },
    { id: '4', donator: 'Other Guy', date: '2023-01-01T00:00:00.000Z', amount: 5, currency: '$' },
  ]

  return (
    <div>
      <div className="text-semibold mb-2 text-lg">Recent Donations</div>
      <div className=" grid grid-cols-4 gap-5">
        {donations.map((donation) => (
          <div key={donation.id} className=" card card-body bg-base-200 p-4 text-white">
            <div className="flex justify-between">
              <div className="text-lg">{donation.donator}</div>
              <div className="text-sm text-neutral-400">
                {new Date(donation.date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-end gap-1 text-lg">
              <div className="text-secondary/60">{donation.currency}</div>
              <div>{donation.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
