'use client'

interface Props {}

export default function DonationMarquee({}: Props) {
  const donations = [
    { id: '1', donator: 'Pepiti', date: '2023-01-01T00:00:00.000Z', amount: 5, currency: '$' },
    { id: '1', donator: 'Tooky', date: '2023-01-01T00:00:00.000Z', amount: 15, currency: '$' },
    { id: '1', donator: 'PDR', date: '2023-01-01T00:00:00.000Z', amount: 10, currency: '$' },
    { id: '1', donator: 'Other Guy', date: '2023-01-01T00:00:00.000Z', amount: 5, currency: '$' },
  ]

  return (
    <div>
      <div className="text-lg text-semibold mb-2">Recent Donations</div>
      <div className="stats gap-5 w-full">
        {donations.map((donation) => (
          <div key={donation.id} className="stat card card-body p-4 bg-base-200 text-white">
            <div className="flex justify-between">
              <div className="text-lg">{donation.donator}</div>
              <div className="text-neutral-400 text-sm">
                {new Date(donation.date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-end text-lg gap-1">
              <div className="text-secondary/60">{donation.currency}</div>
              <div>{donation.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
