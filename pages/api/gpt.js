const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const response = await openai.createEdit({
  model: 'text-davinci-002',
  input:
    'write a cover letter to a company highlighting your strengths and what you know about the company.\nStrengths: hard worker, familiar with the stack, \
    local\nCompany: great cause, solid leadership, mentoring program',
  instruction: '',
  temperature: 0.5,
  top_p: 1,
})

//this is how you can protect an api route, will need to integrate the two of these things
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        'This is protected content. You can access this content because you are signed in.',
    })
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    })
  }
}
