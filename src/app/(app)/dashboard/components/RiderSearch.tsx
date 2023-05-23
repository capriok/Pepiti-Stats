'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Api from '~/api'
import QuerySearch from '~/components/searches/QuerySearch'

export default function RiderSearch() {
  const searchParams = useSearchParams()
  const guidParam = searchParams.get('guid')

  return (
    <QuerySearch
      placeholder="Search for Riders..."
      defaultTerm={guidParam ?? ''}
      query={(term) => Api.SearchForRider(term).then((res) => res.results)}
      render={(result) => (
        <Link key={result._id} href={`/profile/${result._id}`} className="z-40 no-underline">
          <div className="flex w-full justify-between bg-base-200/40 px-4 py-2 text-left hover:bg-opacity-60">
            <div>{result.name}</div>
            {result.banned && (
              <div className="flex">
                <div className="mr-2 text-sm font-bold text-red-600">
                  {result.banned_by + ' Ban'}
                </div>
              </div>
            )}
          </div>
        </Link>
      )}
    />
  )
}
