'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import Loader from '~/components/Loader'
import Spinner from '~/components/Spinner'
import { XIcon } from 'lucide-react'
import Api from '~/api/api'

function RiderSearch() {
  const [term, setTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<Rider>>([])

  const fetchPlayerData = async () => {
    setLoading(true)
    const data = await Api.SearchForRider(term)

    setResults(data.results)
    setLoading(false)
  }

  useEffect(() => {
    if (term.length >= 2) {
      fetchPlayerData()
      setOpen(true)
    } else {
      setResults([])
      setLoading(false)
    }
    if (!term) {
      setOpen(false)
    }
  }, [term])

  return (
    <div className="flex justify-center gap-2 relative">
      <div className="relative">
        <input
          className="input input-bordered w-[400px]"
          placeholder={`Search for Riders...`}
          value={term}
          onChange={(e) => setTerm(e.currentTarget.value)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <button className="h-full z-10 absolute right-[10px]" onClick={() => setOpen(false)}>
            <XIcon />
          </button>
        )}
      </div>
      <SearchDropdown
        term={term}
        open={open}
        setOpen={setOpen}
        loading={loading}
        results={results}
      />
    </div>
  )
}

export default RiderSearch

const SearchDropdown = ({ term, open, setOpen, loading, results }) => {
  console.log(results)

  const openCn = open ? 'opacity-100 absolute' : 'opacity-0 hidden'

  return (
    <div
      className={`${openCn} bg-neutral-700/50 flex flex-col gap-1 transition-opacity overflow-y-auto ring-2 ring-primary/40 backdrop-blur-lg max-h-[300px] w-[400px] absolute top-14 rounded-lg scroll z-20`}>
      {loading && <Spinner className="py-4" />}

      {!results.length && term.length < 2 && (
        <p className="text-center py-4">
          <span className="opacity-75 ">Search for rider above!</span> ☝️
        </p>
      )}

      {results.map((search) => {
        return (
          <Link key={search._id} href={`/profile/${search._id}`} className="z-40 no-underline">
            <div className="w-full flex justify-between text-left bg-neutral-800/40 hover:bg-opacity-60 px-4 py-2">
              <div>{search.name}</div>
              {search.banned && (
                <div className="flex">
                  <h1 className="font-bold text-sm text-red-600 mr-2">
                    {search.banned_by + ' Ban'}
                  </h1>
                </div>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
