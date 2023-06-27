import Link from "next/link"
import WorldRecordsTable from "~/components/tables/records/WorldRecordsTable"
import MMRRecordsTable from "~/components/tables/records/MMRRecordsTable"
import SRRecordsTable from "~/components/tables/records/SRRecordsTable"

export default function TopRecords({ worldRecords, worldMMR, worldSR }) {
  return (
    <div className="grid gap-10 md:gap-5 lg:grid-cols-3">
      <div>
        <Link href="/records/riders">
          <div className="mb-2 text-lg font-semibold">Top Records</div>
        </Link>
        <WorldRecordsTable
          worldRecords={worldRecords}
          resultsEnabled={false}
          sortingEnabled={false}
          miniControls={true}
        />
      </div>
      <div>
        <Link href="/records/mmr">
          <div className="mb-2 text-lg font-semibold">Top MMR</div>
        </Link>
        <MMRRecordsTable
          worldMMR={worldMMR}
          resultsEnabled={false}
          sortingEnabled={false}
          miniControls={true}
        />
      </div>
      <div>
        <Link href="/records/sr" className=" flex items-start gap-2">
          <div className="mb-2 text-lg font-semibold">Top SR</div>
          <div className="text-sm text-accent">(Safety Rating)</div>
        </Link>
        <SRRecordsTable
          worldSR={worldSR}
          resultsEnabled={false}
          sortingEnabled={false}
          miniControls={true}
        />
      </div>
    </div>
  )
}
