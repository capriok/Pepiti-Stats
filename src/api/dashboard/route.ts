import { NextApiResponse, NextApiRequest } from 'next'
import Api from '../api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const [query, limit] = req?.query?.top?.split('?')
  console.log(req)

  // const data = await Api.GetDynamicTopRecords(query[0], query[1])
  // res.json(data)
}
