import Link from "next/link"
import RecordHoldersTable, {
  recordHoldersColumns,
} from "~/components/tables/records/RecordHoldersTable"
import MMRRecordsTable, { mmrRecordsColumns } from "~/components/tables/records/MMRRecordsTable"
import SRRecordsTable, { srRecordsColumns } from "~/components/tables/records/SRRecordsTable"
import { Button } from "~/ui/Button"
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
        <RecordHoldersTable riders={worldRecords.riders} columns={recordHoldersColumns} />
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
        <MMRRecordsTable riders={worldMMR.riders} columns={mmrRecordsColumns} />
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
        <SRRecordsTable riders={worldSR.riders} columns={srRecordsColumns} />
      </div>
    </div>
  )
}
