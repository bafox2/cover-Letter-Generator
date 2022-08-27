const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  const response = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req),
    temperature: 0.54,
    max_tokens: 3792,
    top_p: 0.56,
    frequency_penalty: 1.54,
    presence_penalty: 1.52,
  })
  console.log(response.data.choices[0].text, 'gere is what gpt made')
  return response.data.choices[0].text
}

function generatePrompt(data) {
  return `Create a 50 word cover letter with the following parameters:\nCompany: ${data.company}\nCompany highlights: ${data.highlights}\nPosition: ${data.position}\nJob Listing: ${data.jobListing}`
}
