import mongoose from 'mongoose'

const CoverLetterSchema = new mongoose.Schema(
  {
    document: String,
  },
  { collection: 'coverletters' }
)

module.exports =
  mongoose.models.CoverLetter ||
  mongoose.model('CoverLetter', CoverLetterSchema)
