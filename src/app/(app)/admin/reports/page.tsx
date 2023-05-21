import Link from 'next/link'
import ReportsList from './components/ReportsList'
import PageHeader from '~/components/PageHeader'

export default async function Page() {
  return (
    <>
      <PageHeader
        title="Rider Reports"
        extra={
          <Link href="/admin" className="no-underline">
            Go back
          </Link>
        }
      />
      <ReportsList reports={mockreports} />
    </>
  )
}

const mockreports = [
  {
    reportId: '1',
    plaintiff: {
      id: 'FF011000010B6sEBF2',
      name: 'Tooky',
    },
    defendant: {
      id: 'FF01100001110A0097',
      name: 'A Guy',
    },
    event: {
      id: '644431b9a7ceb3f1a86e36bh',
      name: 'Forest',
      date: '2023-04-22',
    },
    report: {
      claim: 'uh oh, wow this guy is s such a hazard i need him banned',
      proofs: [
        {
          id: '1',
          name: 'pic1.jpeg',
          file: '/assets/hero-dashboard.png',
        },
        {
          id: '2',
          name: 'vid1.jpeg',
          file: '/assets/hero-dashboard.png',
        },
      ],
    },
  },
  {
    reportId: '2',
    plaintiff: {
      id: 'FF011000010B64EBFt',
      name: 'Pepiti',
    },
    defendant: {
      id: 'FF01100001110AC00e',
      name: 'That Guy',
    },
    event: {
      id: '644431b9a7ceb3f1a86ec6bu',
      name: 'Winchester',
      date: '2023-04-22',
    },
    report: {
      claim: 'uh oh, wow this guy is s such a hazard i need him banned',
      proofs: [
        {
          id: '1',
          name: 'pic1.jpeg',
          file: '/assets/hero-dashboard.png',
        },
        {
          id: '2',
          name: 'vid1.jpeg',
          file: '/assets/hero-dashboard.png',
        },
      ],
    },
  },
  {
    reportId: '3',
    plaintiff: {
      id: 'FF011000010B64EBFa',
      name: 'PDR',
    },
    defendant: {
      id: 'FF01100001110AC006',
      name: 'Some Guy',
    },
    event: {
      id: 'b44431b9a7ceb3f1a86ec6b7',
      name: 'Club',
      date: '2023-04-22',
    },
    report: {
      claim: 'uh oh, wow this guy is s such a hazard i need him banned',
      proofs: [
        {
          id: '1',
          name: 'pic1.jpeg',
          file: '/assets/hero-dashboard.png',
        },
      ],
    },
  },
]
