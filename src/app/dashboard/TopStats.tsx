import TopWorldRecords from '~/components/tables/TopWorldRecords'
import TopMMR from '~/components/tables/TopMMR'
import TopSR from '~/components/tables/TopSR'
import Tabs from '~/components/Tabs'

interface Props {
  worldRecords: any
  worldMMR: any
  worldSR: any
}

export default function TableTabs({ worldRecords, worldMMR, worldSR }: Props) {
  const items = [
    {
      key: 'worldRecords',
      label: 'World Records',
      children: (
        <>
          <TopWorldRecords worldRecords={worldRecords} seeMore />
        </>
      ),
    },
    {
      key: 'mmr',
      label: 'MMR',
      children: (
        <>
          <TopMMR worldMMR={worldMMR} seeMore />
        </>
      ),
    },
    {
      key: 'sr',
      label: 'Safety Rating',
      children: (
        <>
          <TopSR worldSR={worldSR} seeMore />
        </>
      ),
    },
  ]

  return (
    <div className="w-full md:w-4/5">
      <h4 className="font-bold text-xl mb-4">Top Stats</h4>
      <Tabs items={items} />
    </div>
  )
}
