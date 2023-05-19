export default function processRaceSession(session: RaceSession) {
  const formatRace = (raceKey) => {
    const race = session[raceKey]

    const standings = Object.keys(session.riders)
      .map((raceNumber) => {
        const rider = session.riders[raceNumber]
        const standings = race.Classification[raceNumber]
        const mmr = race.MMR[raceNumber]
        const fastestLap = race.FastestLap[raceNumber]

        return {
          _id: rider.guid,
          name: rider.name,
          raceNumber: raceNumber,
          bikeName: rider.bike_name,
          bikeNameShort: rider.bike_short_name,
          category: rider.category,
          guid: rider.guid,
          position: standings?.Pos ?? '',
          raceTime: standings?.RaceTime ?? '',
          gap: standings?.Gap ?? '',
          penalty: standings?.Penalty ?? '',
          laps: standings?.Laps ?? '',
          fastestLap: fastestLap ?? '',
          newMmr: !isNaN(mmr?.old_MMR) && !isNaN(mmr?.total) ? mmr?.old_MMR + mmr?.total : 0,
          mmrGain: !isNaN(mmr?.total) ? mmr?.total : 0,
          bpp: !isNaN(mmr?.BPP) ? mmr?.BPP : 0,
          fl: !isNaN(mmr?.FL) ? mmr?.FL : 0,
          hs: !isNaN(mmr?.HS) ? mmr?.HS : 0,
          nrb: !isNaN(mmr?.NRB) ? mmr?.NRB : 0,
          prb: !isNaN(mmr?.PRB) ? mmr?.PRB : 0,
        }
      })
      .filter((standing) => standing.position)
      .sort(sortByPosition)

    return {
      weather: {
        conditions: race.wheater?.conditions,
        airTemp: race.wheater?.air_temp,
      },
      standings: standings,
      winner: standings.find((rider) => rider?.position === 1),
    }
  }

  const processed = {
    name: session.event?.Name,
    date: session.event?.Date,
    type: session.event?.Type,
    track: session.track,
    headCount: session.riders_guid?.length,
    races: {
      race1: session.Race1 ? {} : null,
      race2: session.Race2 ? formatRace('Race2') : null,
    },
  }

  console.log(processed)

  return processed
}

const sortByPosition = (a, b) => {
  if (typeof a.position === 'number' && typeof b.position === 'number') {
    if (a.position === b.position) {
      return a.raceNum - b.raceNum
    }
    return a.position - b.position
  } else if (typeof a.position === 'number') {
    return -1
  } else if (typeof b.position === 'number') {
    return 1
  } else {
    return a.raceNum - b.raceNum
  }
}
