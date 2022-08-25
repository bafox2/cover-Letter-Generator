import mongoose from 'mongoose'

const QuerySchema = new mongoose.Schema(
  {
    Strengths: String,
    Highlights: String,
    CoverLetter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CoverLetter',
    },
  },
  { collection: 'queries' }
)

module.exports = mongoose.models.Query || mongoose.model('Query', QuerySchema)
