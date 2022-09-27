import { userAgent } from 'next/server'

const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function generateText(req, res) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req),
    temperature: 0.54,
    max_tokens: 3792,
    top_p: 0.56,
    frequency_penalty: 1.54,
    presence_penalty: 1.52,
  })
  const text = response.data.choices[0].text
  console.log('text in gpt.js', text)
  const isSafe = await checkInContentFilter(text)
  console.log(isSafe, 'isSafe from gpt.js')
  //this is what is stopping the flow
  if (isSafe) {
    return text
  }
  if (!isSafe) {
    console.log('not safe', isSafe)
    return 'rejected by content filter'
  }
}

function generatePrompt(req) {
  if (req.type === 'user') {
    return `Create a 20 word cover letter with the following parameters:\nCompany: ${req.data.company}\nCompany highlights: ${req.data.highlights}\nPosition: ${req.data.position}\nJob Listing: ${req.data.jobListing}`
  } else {
    return `Create a 20 word cover letter with the following parameters:\nCompany: ${req.data.company}\nCompany highlights: ${req.data.highlights}\nPosition: ${req.data.position}\nJob Listing: ${req.data.jobListing}`
  }
}

async function checkInContentFilter(message) {
  const response = await openai.createCompletion({
    model: 'content-filter-alpha',
    prompt: '<|endoftext|>' + message + '\n--\nLabel:',
    temperature: 0,
    max_tokens: 1,
    top_p: 0,
    logprobs: 10,
  })

  let outputLabel = response.data['choices'][0]['text']
  const toxicThreshold = -0.355
  if (outputLabel === '2') {
    const logprobs = response.data['choices'][0]['logprobs']['top_logprobs'][0]
    if (logprobs['2'] < toxicThreshold) {
      const logprob_0 = logprobs['0']
      const logprob_1 = logprobs['1']

      if (logprob_0 && logprob_1) {
        if (logprob_0 >= logprob_1) {
          outputLabel = '0'
        } else {
          outputLabel = '1'
        }
      } else if (logprob_0) {
        outputLabel = '0'
      } else if (logprob_1) {
        outputLabel = '1'
      }
    }
  }
  if (!['0', '1', '2'].includes(outputLabel)) {
    outputLabel = '2'
  }

  return outputLabel !== '2'
}
