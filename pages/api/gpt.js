const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
export default async function (req, res) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req.body),
    temperature: 0.54,
    max_tokens: 3792,
    top_p: 0.56,
    frequency_penalty: 1.54,
    presence_penalty: 1.52,
  })
  res.status(200).json({ result: response.data.choices[0].text })
}

function generatePrompt(data) {
  return `Create 200 word cover letter with the following parameters:\nCompany: ${data.company}\nCompany highlights: ${data.highlights}\nPosition: ${data.position}\nJob Listing: ${data.jobListing}`
}
