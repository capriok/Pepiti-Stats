import Link from 'next/link'
import Api from '~/api'

export async function generateMetadata({ params: { guid } }) {
  const rider = await Api.GetRider(guid)

  return {
    title: 'Pepiti | Blacklist Lookup',
    description: `Looking up: ${rider?.name}
Status: ${rider?.banned ? 'Banned' : 'Not Banned'}
${rider?.banned ? `Reason: ${rider?.banned_by}` : ''}`,
  }
}

export default async function Page({ params: { guid } }) {
  const rider = await Api.GetRider(guid)

  return (
    <div className="grid min-h-[75vh] w-full place-items-center">
      <div className="grid place-items-center">
        <div className="mb-4 w-full text-center text-xl">Blacklist Lookup</div>
        <div className="stat grid w-[400px] place-items-center justify-center gap-4 rounded-lg bg-base-200">
          <div className="grid place-items-center">
            <div className="stat-title w-full text-center">Ban Status</div>
            {rider.banned ? (
              <div className="text-lg font-semibold text-error">Banned</div>
            ) : (
              <div className="text-lg font-semibold text-secondary">Not Banned</div>
            )}
          </div>
          {rider.banned && (
            <div className="grid place-items-center">
              <>
                <div className="stat-title w-full text-center">Reason for ban</div>
                <div className="stat-desc text-lg font-semibold">{rider.banned_by}</div>
              </>
            </div>
          )}
        </div>

        {rider.banned && (
          <div className="stat mt-4 grid w-[400px] place-items-center justify-center gap-4 rounded-lg bg-base-200">
            <div className="grid place-items-center gap-4">
              <div className="stat-title w-full text-center">Click here for more info</div>
              <Link
                href={`/blacklists?guid=${rider._id}${
                  rider.banned_by?.toLowerCase().includes('sr') ? '&tab=blacklistSr' : ''
                }`}
                className="btn-outline btn-ghost btn-sm btn">
                Blacklist Info
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.com/invite/mx-bikes"
                className="btn-outline btn-ghost btn-sm btn">
                Ban Appeal (MXB Discord)
              </Link>
              <button disabled={true} className="btn-outline btn-ghost btn-sm btn">
                {/* <Link href={`/appeal/${rider._id}`} className="btn-outline btn-ghost btn-sm btn"> */}
                Ban Appeal (On-Site)
                {/* </Link> */}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
