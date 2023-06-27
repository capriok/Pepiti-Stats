"use client"

export default function RiderWorldRecordStats({ rider }) {
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
        <div className="stat-value mt-2 text-xl">
          {(
            rider.world_records["MX1 OEM"] ||
            0 + rider.world_records["FACTORY 450"] ||
            0 + rider.world_records["MX1-2T OEM"] ||
            0
          ).toLocaleString()}
        </div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">250 Class</div>
        <div className="stat-value mt-2 text-xl">
          {(
            rider.world_records["MX2 OEM"] ||
            0 + rider.world_records["FACTORY 250"] ||
            0
          ).toLocaleString()}
        </div>
      </div>
      <div className="stat w-full text-center">
        <div className="stat-title">Lights</div>
        <div className="stat-value mt-2 text-xl">
          {(
            rider.world_records["MX2-2T OEM"] ||
            0 + rider.world_records["FACTORY 125"] ||
            0 + rider.world_records["FACTORY 150"] ||
            0
          ).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
