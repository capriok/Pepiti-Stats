'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Loader from '~/components/Loader'
import Spinner from '~/components/Spinner'
import { XIcon } from 'lucide-react'

export interface PlayerData {
  _id: string
  MMR: number
  SR: number
  name: string
  contact: number
  banned: boolean
  banned_by: string
}

function RiderTrackSearch({ tracksData }) {
  const [focused, setFocused] = useState(false)
  const [category, setCategory] = useState<string>('riders')
  const [searchData, setSearchData] = useState<Array<{
    _id: string
    name: string
    banned: boolean
    bannedBy: string
  }> | null>(tracksData)
  const [isFetching, setIsFetching] = useState(false)
  const [search, setSearch] = useState('')

  const fetchPlayerData = async () => {
    setIsFetching(true)
    const res = await fetch(`/api/searchRider?search=${search}`)
    const { results: playerSearchData } = await res.json()
    const resultsForSearch = playerSearchData.map((data: PlayerData) => ({
      _id: data._id,
      name: data.name,
      banned: data.banned,
      bannedBy: data.banned_by,
    }))

    setSearchData(resultsForSearch)
    setIsFetching(false)
  }

  useEffect(() => {
    if (search.length >= 2 && category === 'riders') {
      // setSearchData(null)
      fetchPlayerData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (category === 'tracks') {
      setSearchData(tracksData)
    } else {
      setSearchData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  if (!tracksData) return <Spinner />

  return (
    <div className="flex justify-center gap-2 relative">
      <div className="form-control">
        <div className="input-group">
          <input
            className="input input-bordered"
            placeholder={`Search for ${category}...`}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            className="select select-bordered">
            <option value="tracks">Tracks</option>
            <option value="riders">Riders</option>
          </select>
        </div>
      </div>
      <div
        className={`${
          focused ? 'opacity-100 absolute' : 'opacity-0 hidden'
        } bg-neutral-700/50 flex flex-col gap-1 transition-opacity overflow-y-auto ring-2 ring-primary/70 backdrop-blur-lg min-h-[10vh] max-h-[25vh] w-[300px] absolute top-14 rounded-lg scroll z-20`}
        onClick={() => setFocused(false)}>
        <button className="p-1 bg-neutral w-fit h-full ml-1 mt-1 rounded-md sticky z-50 top-1">
          <XIcon />
        </button>
        {isFetching && <Loader text="Searching players..." />}

        {searchData?.length === 0 && !search && (
          <p className="text-center mt-2">
            <span className="opacity-75">Search for rider above!</span> ☝️
          </p>
        )}
        {searchData
          ?.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
          .map((search) => {
            return (
              <Link
                key={search._id}
                href={
                  category === 'tracks'
                    ? `/track/${encodeURIComponent(search.name)}`
                    : `/profile/${search._id}`
                }
                className="z-40 no-underline">
                <div className="w-full flex justify-between text-left bg-neutral-800/40 hover:bg-opacity-60 px-4 py-2">
                  <div>{search.name}</div>
                  {search.banned && (
                    <div className="flex">
                      <h1 className="font-bold text-sm text-red-600 mr-2">
                        {search.bannedBy + ' Ban'}
                      </h1>
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default RiderTrackSearch
