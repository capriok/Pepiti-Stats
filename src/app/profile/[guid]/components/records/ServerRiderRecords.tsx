import React from 'react'
import Api from '~/api/api'
import RiderRecordsTable from './RiderRecordsTable'

export default async function ServerRiderRecords({ guid }) {
  const riderRecords = await Api.GetRiderRecords(guid)

  return <RiderRecordsTable records={riderRecords.records} />
}
