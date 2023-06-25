"use client"

import React, { useEffect, useState } from "react"
import Spinner from "~/components/Spinner"
import { XIcon } from "lucide-react"

interface Props {
  query: (term: string) => Promise<any>
  render: (result: any) => JSX.Element
  placeholder: string
  defaultTerm?: string
}

export default function QuerySearch({ query, render, placeholder, defaultTerm = "" }: Props) {
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState(defaultTerm)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<RiderSearch>>([])

  const fetchData = async () => {
    setLoading(true)
    setResults(await query(term))
    setLoading(false)
  }

  useEffect(() => {
    if (term.length >= 2) {
      fetchData()
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
          className="input w-full  border border-accent/40 bg-base-100 md:w-[400px]"
          placeholder={placeholder}
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
      <SearchDropdown term={term} open={open} loading={loading} results={results} render={render} />
    </div>
  )
}

const SearchDropdown = ({ term, open, loading, results, render }) => {
  const openCn = open ? "opacity-100 absolute" : "opacity-0 hidden"

  return (
    <div
      className={`${openCn} scroll absolute top-14 z-20 flex max-h-[300px] w-full flex-col overflow-y-auto rounded-lg border border-secondary/40 bg-base-100 backdrop-blur-lg transition-opacity md:w-[400px]`}
    >
      {loading && (
        <div className="py-4">
          <Spinner />
        </div>
      )}

      {!results.length && term.length < 2 && (
        <p className="py-4 text-center">
          <span className="text-accent ">Search above!</span> ☝️
        </p>
      )}

      {results.map(render)}
    </div>
  )
}
