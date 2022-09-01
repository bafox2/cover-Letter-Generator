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
  const filterResponse = await openai.complete({
    engine: 'content-filter-alpha-c4',
    prompt: '< endoftext|>' + response + '\n--\nLabel:',
    temperature: 0,
    maxTokens: 1,
    topp: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    logprobs: 10,
  })
  const filterLabel = filterResponse.data.choices[0].text
  console.log(response.data.choices[0].text, 'gere is what gpt made')
  console.log(filterResponse.data.choices[0].text, 'gere is what gpt made')
  if (filterLabel == '0' || filterLabel == '1') {
    return filterLabel
  }
  return 'please modify your parameters next time, this was flagged by GPT as inappropriate'
}

function generatePrompt(data) {
  if (data.type === 'user') {
    return `Create a 200 word cover letter with the following parameters:\nCompany: ${data.company}\nCompany highlights: ${data.highlights}\nPosition: ${data.position}\nJob Listing: ${data.jobListing}`
  } else {
    return `Create a 50 word cover letter with the following parameters:\nCompany: ${data.company}\nCompany highlights: ${data.highlights}\nPosition: ${data.position}\nJob Listing: ${data.jobListing}`
  }
}
