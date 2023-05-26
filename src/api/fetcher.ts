const ENDPOINT = process.env.NEXT_PUBLIC_API
const nextConfig = { next: { revalidate: 30 } }

export const fetcher = async (url: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
  })
  return res.json()
}

export const fetcherWithToken = async (url: string, token: string) => {
  const res = await fetch(ENDPOINT + url, {
    ...nextConfig,
    credentials: 'include',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res.json()
}
