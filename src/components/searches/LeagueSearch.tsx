'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Spinner from '~/components/Spinner'
import { XIcon } from 'lucide-react'
import Api from '~/api'

export default function LeagueSearch() {
  const [term, setTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<any>>([])

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
    <div className="relative flex justify-center gap-2">
      <div className="relative">
        <input
          className="input-bordered input w-full md:w-[400px]"
          placeholder={`Search for Leagues...`}
          value={term}
          onChange={(e) => setTerm(e.currentTarget.value)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <button className="absolute right-[10px] z-10 h-full" onClick={() => setOpen(false)}>
            <XIcon />
          </button>
        )}
      </div>
      <SearchDropdown term={term} open={open} loading={loading} results={results} />
    </div>
  )
}

const SearchDropdown = ({ term, open, loading, results }) => {
  const openCn = open ? 'opacity-100 absolute' : 'opacity-0 hidden'

  return (
    <div
      className={`${openCn} scroll absolute top-14 z-20 flex max-h-[300px] w-full flex-col gap-1 overflow-y-auto rounded-lg bg-neutral-700/50 ring-2 ring-primary/40 backdrop-blur-lg transition-opacity md:w-[400px]`}>
      {loading && <Spinner className="py-4" />}

      {!results.length && term.length < 2 && (
        <p className="py-4 text-center">
          <span className="opacity-75 ">Search for league above!</span> ☝️
        </p>
      )}

      {results.map((search) => {
        return (
          <Link key={search._id} href={`/profile/${search._id}`} className="z-40 no-underline">
            <div className="flex w-full justify-between bg-neutral-800/40 px-4 py-2 text-left hover:bg-opacity-60">
              <div>{search.name}</div>
              {search.banned && (
                <div className="flex">
                  <div className="mr-2 text-sm font-bold text-red-600">
                    {search.banned_by + ' Ban'}
                  </div>
                </div>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
