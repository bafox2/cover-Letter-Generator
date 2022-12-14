import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema(
  {
    user: String,
    company: String,
    position: String,
    highlights: String,
    jobListing: String,
    result: String,
    type: String,
  },
  { timestamps: true }
)

module.exports =
  mongoose.models.Request || mongoose.model('Request', RequestSchema)
