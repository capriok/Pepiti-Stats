"use client"

export default function RiderWorldRecordStats({ rider }) {
  const categories = {
    "450": {
      "MX3 OEM": rider.world_records["MX3 OEM"],
      "MX1 OEM": rider.world_records["MX1 OEM"],
      "FACTORY 450": rider.world_records["FACTORY 450"],
    },
    "250": {
      "MX2 OEM": rider.world_records["MX2 OEM"],
      "MX1-2T OEM": rider.world_records["MX1-2T OEM"],
      "FACTORY 250": rider.world_records["FACTORY 250"],
      "FACTORY 250 2T": rider.world_records["FACTORY 250 2T"],
    },
    "125": {
      "MX2-2T OEM": rider.world_records["MX2-2T OEM"],
      "FACTORY 150": rider.world_records["FACTORY 150"],
      "FACTORY 125": rider.world_records["FACTORY 125"],
    },
  }

  const reduce = (k) => Object.keys(categories[k]).reduce((a, c) => a + categories[k][c] ?? 0, 0)

  const totals = {
    "450": reduce("450"),
    "250": reduce("250"),
    "125": reduce("125"),
  }

  return (
    <div className="stats flex w-full bg-base-100/60 text-center shadow-md dark:bg-base-100">
      <div className="stat w-full text-center">
        <div className="stat-title">Total</div>
        <div className="stat-value mt-2 text-xl text-primary">
          {rider.world_records["total"].toLocaleString()}
        </div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">450 Class</div>
        <div className="stat-value mt-2 text-xl">{totals["450"]}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">250 Class</div>
        <div className="stat-value mt-2 text-xl">{totals["250"]}</div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Lights</div>
        <div className="stat-value mt-2 text-xl">{totals["125"]}</div>
      </div>
    </div>
  )
}
