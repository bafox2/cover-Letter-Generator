import mongoose from 'mongoose'

const QuerySchema = new mongoose.Schema(
  {
    Strengths: String,
    Highlights: String,
    Response: String,
  },
  { collection: 'queries' }
)

module.exports = mongoose.models.Query || mongoose.model('Query', QuerySchema)
