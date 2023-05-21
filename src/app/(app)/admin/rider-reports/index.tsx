import PageLayout from '../../../components/common/PageLayout'
import useAuthUser from '../../../hooks/useAuthUser'
import useSWR from 'swr'
import Loader from '../../../components/common/Loader'
import { useState } from 'react'
import Spinner from '../../../components/common/Spinner'
import { Pill } from '../../../components/common/Pill'
import PageHeader from '../../../components/common/PageHeader'
import Link from 'next/link'
import Image from 'next/image'

import proof from '../../../public/brand/assets/Background.png'
import { IconArrowRight } from '@tabler/icons'
import AdminLayout from '../layout'

const adminRiderReports = [
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
               file: proof,
            },
            {
               id: '2',
               name: 'vid1.jpeg',
               file: proof,
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
               file: proof,
            },
            {
               id: '2',
               name: 'vid1.jpeg',
               file: proof,
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
               file: proof,
            },
         ],
      },
   },
]

export default function Page() {
   // const { data, isLoading } = useSWR('/api/admin/rider-reports')

   // if (isLoading) {
   //    return <Loader text="Loading Rider Report Form..." />
   // }

   // const riderReports = data.riderReports

   return (
      <AdminLayout>
         <PageLayout headTitle={'Rider Report'}>
            <PageHeader
               title="Rider Reports"
               extra={
                  <Link href="/admin" className="no-underline">
                     Go back
                  </Link>
               }
            />
            <RiderReportsList reports={adminRiderReports} />
         </PageLayout>
      </AdminLayout>
   )
}

const RiderReportsList = ({ reports }) => {
   const [openId, setOpenId] = useState(null)

   const handleIdleControlsClick = (id) => {
      console.log(id)
      setOpenId(id)
   }

   return (
      <>
         {reports.map((r) => {
            const reportActive = r.reportId === openId
            return (
               <div key={r.plaintiff.id} className="w-full card card-body bg-neutral-800/40 my-4">
                  <div className="w-full flex justify-between">
                     <div className="flex align-middle text-2xl text-white">
                        {r.plaintiff.name} <IconArrowRight className="mx-4 mt-1" />
                        {r.defendant.name}
                     </div>
                     <div className="relative">
                        <ReportControls
                           active={reportActive}
                           open={() => handleIdleControlsClick(r.reportId)}
                           close={() => handleIdleControlsClick(null)}
                        />
                     </div>
                  </div>
                  <div className="w-full text-white">
                     <ReportContent r={r} active={reportActive} />
                  </div>
               </div>
            )
         })}
      </>
   )
}

const ReportControls = ({ active, open, close }) =>
   active ? <ActiveReportControls /> : <IdleReportControls open={open} />

const IdleReportControls = ({ open }) => {
   return (
      <div className="flex flex-col align-middle justify-center w-fit">
         <button className="btn btn-ghost btn-sm" onClick={open}>
            Investigate
         </button>
      </div>
   )
}

const ActiveReportControls = () => {
   return (
      <div className="flex flex-col align-middle justify-center w-fit absolute right-0">
         <button className="btn btn-sm btn-error mb-2">Ban</button>
         <button className="btn btn-sm btn-outline">Dismiss</button>
         <button className="btn btn-sm btn-outline mt-8">Abuse</button>
      </div>
   )
}

const ReportContent = ({ r, active }) =>
   active ? <ActiveReportContent r={r} /> : <IdleReportContent r={r} />

const IdleReportContent = ({ r }) => {
   return (
      <div className="mt-4 w-[500px] flex justify-between">
         <div>
            <div className="text-xl">Event</div>
            {r.event.name}
         </div>
         <div>
            <div className="text-xl">Date</div>
            {new Date(r.event.date).toLocaleString()}
         </div>
      </div>
   )
}

const ActiveReportContent = ({ r }) => {
   return (
      <>
         <IdleReportContent r={r} />
         <div className="flex flex-col mt-4">
            <div className="text-2xl">Report</div>
            <div className="mt-2">
               <div className="text-xl">Claim</div>
               <div>{r.report.claim}</div>
            </div>
            <div className="mt-2">
               <label>Proof</label>
               <div className="flex">
                  {r.report.proofs.map((p) => (
                     <div key={p.id}>
                        <Image
                           width={100}
                           height={100}
                           src={p.file}
                           alt={p.name}
                           className="bg-white m-0 mr-4"
                        />
                        {p.name}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   )
}
