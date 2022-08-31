import dbConnect from '../../../lib/dbConnect'
import Request from '../../../models/Request'
import User from '../../../models/User'
import gpt from '../gpt'
import { useSession } from 'next-auth/react'

export default async function handler(req, res) {
  await dbConnect()
  const { method } = req
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
        const user = await User.findOne({ name: req.body.data.user })
        const limitRate = await user.compareLastRequest()
        const request = await Request.create({
          company: req.body.data.data.company,
          position: req.body.data.data.position,
          jobListing: req.body.data.data.jobListing,
          highlights: req.body.data.data.highlights,
          user: req.body.data.user,
          type: req.body.data.type,
          result: 'gpt(body.data)',
          // result: await gpt(body.data),
        })
        if (limitRate) {
          await user.incrementRequests()
          res.status(201).json(request)
        } else {
          res
            .status(429)
            .json({
              error: `you must wait until ${user.calculateNextRequest()} to make your next post`,
            })
        }
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
