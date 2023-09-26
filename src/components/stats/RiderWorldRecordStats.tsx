"use client"

export default function RiderWorldRecordStats({ rider }) {
  const categories = {
    "450": {
      "MX3 OEM": rider.world_records["MX3 OEM"] ?? 0,
      "MX1 OEM": rider.world_records["MX1 OEM"] ?? 0,
      "FACTORY 450": rider.world_records["FACTORY 450"] ?? 0,
      "E10 450": rider.world_records["E10 450"] ?? 0,
    },
    "250": {
      "MX2 OEM": rider.world_records["MX2 OEM"] ?? 0,
      "MX1-2T OEM": rider.world_records["MX1-2T OEM"] ?? 0,
      "Classic MX1 OEM": rider.world_records["Classic MX1 OEM"] ?? 0,
      "FACTORY 250": rider.world_records["FACTORY 250"] ?? 0,
      "FACTORY 250 2T": rider.world_records["FACTORY 250 2T"] ?? 0,
      "E10 250": rider.world_records["E10 250"] ?? 0,
      "E10 250 2T": rider.world_records["E10 250T"] ?? 0,
    },
    "125": {
      "MX2-2T OEM": rider.world_records["MX2-2T OEM"] ?? 0,
      "MX-E OEM": rider.world_records["MX-E OEM"] ?? 0,
      "Classic MX2 OEM": rider.world_records["Classic MX2 OEM"] ?? 0,
      "FACTORY 150": rider.world_records["FACTORY 150"] ?? 0,
      "FACTORY 125": rider.world_records["FACTORY 125"] ?? 0,
      "E10 150": rider.world_records["E10 150"] ?? 0,
      "E10 125": rider.world_records["E10 125"] ?? 0,
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
