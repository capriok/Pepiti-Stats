import PageLayout from "~/components/PageLayout"
import tracks from "@/data/tracks.json"

export const metadata = {
  title: "Pepiti | Tracks in Rotation",
  description: "A list of all tracks in Rotation on Pepiti Servers",
}

export default async function Page() {
  return (
    <PageLayout
      width="feed"
      header={{
        title: "Tracks in Rotation",
      }}
    >
      <div className="flex flex-col gap-4">
        <p>
          Feel free to let us know in the
          <a
            href="https://discord.com/invite/mx-bikes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {" "}
            MXB Discord{" "}
          </a>
          what tracks we should add/remove from rotation. We are always open to suggestions,
          although we require tracks in rotation to have a few attributes.
        </p>
        <ul>
          <li>1. Valid Timing Gates</li>
          <li>2. No Cuts/Cheat Lines</li>
          <li>3. Reasonable Lap Times</li>
        </ul>
        <p>
          Tracks in rotation on Pepiti Severs can be found at
          <a
            href="https://mxb-mods.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {" "}
            MXB Mods
          </a>
          <sup className="text-xs">(Free)</sup>, and{" "}
          <a
            href="https://www.mxbikes-shop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            MXB Shop
          </a>
          <sup className="text-xs">(Paid)</sup>.
        </p>

        <hr className="mt-2 border-accent" />

        {Object.keys(tracks).map((category, i) => (
          <section key={category} className="border-b border-accent pb-4 last:border-none">
            <div className="mb-2 text-2xl font-semibold capitalize text-secondary">{category}</div>
            <ul className="indent-4">
              {tracks[category].map((track, i) => (
                <li key={i} className="capitalize">
                  {track.replaceAll("_", " ").replaceAll("-", "").replaceAll(".", " ")}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageLayout>
  )
}
