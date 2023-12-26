"use client"

import { useEffect, useState } from "react"
import PageLayout from "~/components/PageLayout"
import { Input } from "~/ui/input"
import useSWR from "swr"
import { useRouter, useSearchParams } from "next/navigation"
import { GetRider, SearchForRider } from "~/api"
import Spinner from "~/components/Spinner"
import { useDebounce } from "~/utils/use-debounce"
import Link from "next/link"
import { Button } from "~/ui/Button"
import { ScrollArea } from "@radix-ui/react-scroll-area"

const GUID_Prefix = "FF0110000"
const validSearchLength = 3

export default function Page() {
  const router = useRouter()
  const sp = useSearchParams()
  const nameParam = sp.get("name")

  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 1000)
  const [rider, setRider] = useState<any>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // FF011000010B64EBF5

  useEffect(() => {
    if (search.length < validSearchLength) return
    setLoading(true)
  }, [search])

  useEffect(() => {
    if (debouncedSearch.length < validSearchLength) return
    setRider(null)
  }, [debouncedSearch])

  useEffect(() => {
    if (search.length < validSearchLength) return

    if (debouncedSearch.startsWith(GUID_Prefix)) {
      GetRider(debouncedSearch).then((res) => {
        console.log("Find Rider", { debouncedSearch, rider: res })

        setRider(res)
        setLoading(false)
      })
    } else {
      SearchForRider(debouncedSearch).then((res) => {
        console.log("Name Search Results", {
          debouncedSearch,
          data: res.results,
        })

        setSearchResults(res.results)
        setLoading(false)
      })
    }
  }, [debouncedSearch])

  const searchIsLongEnough = search.length >= validSearchLength

  const searchCouldBeGUID = search.startsWith(GUID_Prefix)
  const riderFound = rider?._id && searchIsLongEnough
  const resultsFound = searchResults.length > 0 && searchIsLongEnough

  return (
    <PageLayout
      width="feed"
      header={{
        title: "Find Profile",
      }}
    >
      <div className="mt-20 grid place-items-center">
        <div className="flex flex-col gap-2 md:w-1/2">
          <label className="text-md text-muted font-normal">
            Enter Rider{" "}
            <b>
              {" "}
              <i>Name</i>{" "}
            </b>
            or
            <b>
              {" "}
              <i>GUID</i>
            </b>
          </label>
          <Input className="w-full" name="guid" onChange={(e) => setSearch(e.target.value)} />

          <br />
          {loading && <Spinner />}

          {!loading && searchIsLongEnough && !riderFound && resultsFound && (
            <div className="flex flex-col gap-2">
              <h2 className="flex justify-between font-semibold">
                Choose a profile.
                <span className="text-sm font-normal text-accent">
                  {searchResults.length} results
                </span>
              </h2>
              <ScrollArea className="h-[500px] w-full gap-2 space-y-2 overflow-auto rounded-md pr-2">
                {searchResults.map((rider) => (
                  <Link
                    key={rider._id}
                    prefetch={false}
                    href={`/profile/${rider._id}`}
                    className="w-full"
                  >
                    <Button variant="link" className="my-1 w-full bg-base-200 text-left">
                      {rider?.name}
                    </Button>
                  </Link>
                ))}
              </ScrollArea>
            </div>
          )}

          {!loading && searchIsLongEnough && !riderFound && !resultsFound && (
            <div className="text-center text-accent">
              No Results found. {searchCouldBeGUID && "Try searching by name."}
            </div>
          )}

          {!loading && searchIsLongEnough && riderFound && (
            <>
              <h2 className="flex justify-between font-semibold">Profile found</h2>
              <Link
                key={rider._id}
                prefetch={false}
                href={`/profile/${rider._id}`}
                className="w-full"
              >
                <Button variant="link" className="my-1 w-full bg-base-200 text-left">
                  {rider?.name}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
