"use client"

import Link from "next/link"
import Table from "~/ui/Table"
import { Button } from "~/ui/Button"
import { mmrRecordsData, mmrRecordsColumns } from "~/components/tables/data/topMmrRecords"
import { srRecordsData, srRecordsColumns } from "~/components/tables/data/topSrRecords"
import { recordHoldersColumns, recordHoldersData } from "~/components/tables/data/topRecordsHolders"
import { ChevronsRight } from "lucide-react"

export default function TopRecords({ worldRecords, worldMMR, worldSR }) {
  return (
    <div className="grid gap-10 md:gap-5 lg:grid-cols-3">
      <div>
        <div className="group flex justify-between">
          <Link href="/records/riders" className="w-full">
            <div className="mb-2 text-lg font-semibold">World Record Holders</div>
          </Link>

          <Link
            href="/records/sr"
            title="Explore Record Holders"
            className="hidden group-hover:flex"
          >
            <Button variant="ghost">
              <ChevronsRight size={14} />
            </Button>
          </Link>
        </div>
        <Table data={recordHoldersData(worldRecords.riders)} columns={recordHoldersColumns} />
      </div>
      <div>
        <div className="group flex justify-between">
          <Link href="/records/mmr" className="w-full">
            <div className="mb-2 text-lg font-semibold">MMR Rankings</div>
          </Link>
          <Link href="/records/sr" title="Explore MMR Rankings" className="hidden group-hover:flex">
            <Button variant="ghost">
              <ChevronsRight size={14} />
            </Button>
          </Link>
        </div>
        <Table data={mmrRecordsData(worldMMR.riders)} columns={mmrRecordsColumns} />
      </div>
      <div>
        <div className="group flex justify-between">
          <Link href="/records/sr" className="w-full">
            <div className="mb-2 text-lg font-semibold">Safety Rankings</div>
          </Link>
          <Link
            href="/records/sr"
            title="Export Safety Ratings"
            className="hidden group-hover:flex"
          >
            <Button variant="ghost">
              <ChevronsRight size={14} />
            </Button>
          </Link>
        </div>
        <Table data={srRecordsData(worldSR.riders)} columns={srRecordsColumns} />
      </div>
    </div>
  )
}
