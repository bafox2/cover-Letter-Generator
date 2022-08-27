import dbConnect from '../../../lib/dbConnect'
import Request from '../../../models/Request'
import gpt from '../gpt'
import { useSession } from 'next-auth/react'

export default async function handler(req, res) {
  const { method, body } = req
  console.log(body, 'this is from index.js of request')
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const requests = await Request.find()
        res.status(200).json(requests)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      break
    case 'POST':
      try {
        const request = await Request.create({
          ...body,
          result: await gpt(body.data),
        })
        res.status(201).json(request)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
      }
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
      break
  }
}
