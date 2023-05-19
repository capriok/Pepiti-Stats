import React from 'react'
import Api from '~/api'
import RiderRacesTable from './RiderRacesTable'

export default async function ServerRiderRecords({ guid }) {
  const riderRaces = await Api.GetRiderRaces(guid)

  return <RiderRacesTable races={riderRaces.races} />
}
