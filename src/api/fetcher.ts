const ENDPOINT = process.env.NEXT_PUBLIC_API
const nextConfig = { next: { revalidate: 30 } }

export const fetcher = async (url: string) => {
  console.log("%cFetcher", "color: goldenrod", { url })

  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
  })

  try {
    const status = res.status
    const data = await res.json()
    if (status !== 200) throw new Error(data.message)

    return data
  } catch (error) {
    throw new Error("An unknown error occurred")
  }
}

export const fetcherWithToken = async (url: string, token: string) => {
  console.log("%cFetcherWithToken", "color: goldenrod", { url, token })

  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    credentials: "include",
  })

  try {
    const status = res.status
    const data = await res.json()
    if (status !== 200) throw new Error(data.message)

    return data
  } catch (error) {
    throw new Error("An unknown error occurred")
  }
}
