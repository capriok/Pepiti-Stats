"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SearchForRider, GetRider } from "~/api"
import QuerySearch from "~/components/searches/QuerySearch"

export default function RiderSearch() {
  const searchParams = useSearchParams()
  const searchParam = searchParams.get("search")

  return (
    <QuerySearch
      placeholder="Search Name or GUID"
      defaultTerm={searchParam ?? ""}
      query={(term) => SearchForRider(term).then((res) => res.results)}
      backUpQuery={(term) => GetRider(term).then((res) => (res ? [res] : []))}
      render={(result) => (
        <Link key={result._id} href={`/profile/${result._id}`} className="z-40 no-underline">
          <div className="flex w-full justify-between bg-base-200/40 px-4 py-2 text-left text-sm hover:bg-opacity-60">
            <div>{result.name}</div>
            {result.banned && (
              <div className="flex">
                <div className="mr-2 text-sm font-bold text-red-600">
                  {result.banned_by + " Ban"}
                </div>
              </div>
            )}
          </div>
        </Link>
      )}
    />
  )
}
