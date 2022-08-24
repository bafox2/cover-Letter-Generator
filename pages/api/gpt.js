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
