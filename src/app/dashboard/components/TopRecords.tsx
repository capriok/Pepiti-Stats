import Link from "next/link"
import WorldRecordsTable from "~/components/tables/records/WorldRecordsTable"
import MMRRecordsTable from "~/components/tables/records/MMRRecordsTable"
import SRRecordsTable from "~/components/tables/records/SRRecordsTable"
import { Button } from "~/ui/Button"
import { ChevronsRight } from "lucide-react"

export default function TopRecords({ worldRecords, worldMMR, worldSR }) {
  return (
    <div className="grid gap-10 md:gap-5 lg:grid-cols-3">
      <div>
        <div className="group flex justify-between">
          <Link href="/records/riders" className="w-full">
            <div className="mb-2 text-lg font-semibold">Record Holders</div>
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
        <WorldRecordsTable
          worldRecords={worldRecords}
          resultsEnabled={false}
          sortingEnabled={false}
          paginationEnabled={false}
        />
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
        <MMRRecordsTable
          worldMMR={worldMMR}
          resultsEnabled={false}
          sortingEnabled={false}
          paginationEnabled={false}
        />
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
        <SRRecordsTable
          worldSR={worldSR}
          resultsEnabled={false}
          sortingEnabled={false}
          paginationEnabled={false}
        />
      </div>
    </div>
  )
}
