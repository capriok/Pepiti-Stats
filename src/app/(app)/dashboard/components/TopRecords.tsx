import Link from "next/link"
import WorldRecordsTable from "~/components/tables/WorldRecordsTable"
import MMRRecordsTable from "~/components/tables/MMRRecordsTable"
import SRRecordsTable from "~/components/tables/SRRecordsTable"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/Popover"
import { MoreHorizontal } from "lucide-react"

export default function TopRecords({ worldRecords, worldMMR, worldSR }) {
  return (
    <div>
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger className="mt-4 flex justify-center">
            <MoreHorizontal />
          </PopoverTrigger>
          <PopoverContent className="flex justify-center">
            <Link
              href="/records"
              className="hover:bg-border btn-ghost btn-sm btn w-fit hover:bg-transparent hover:text-secondary"
            >
              See all Top Records
            </Link>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div>
          <Link href="/records/riders">
            <div className="mb-2 text-lg font-semibold">Top Records</div>
          </Link>
          <WorldRecordsTable
            worldRecords={worldRecords}
            sortingEnabled={false}
            miniControls={true}
          />
        </div>
        <div>
          <Link href="/records/mmr">
            <div className="mb-2 text-lg font-semibold">Top MMR</div>
          </Link>
          <MMRRecordsTable worldMMR={worldMMR} sortingEnabled={false} miniControls={true} />
        </div>
        <div>
          <Link href="/records/sr" className=" flex items-start gap-2">
            <div className="mb-2 text-lg font-semibold">Top SR</div>
            <div className="text-sm text-accent">(Safety Rating)</div>
          </Link>
          <SRRecordsTable worldSR={worldSR} sortingEnabled={false} miniControls={true} />
        </div>
      </div>
    </div>
  )
}
