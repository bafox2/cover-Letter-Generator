import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    requests: Number,
  },
  { collection: 'users', timestamps: true }
)

UserSchema.methods.getRequests = async function () {
  const requests = await Request.find({ user: this.name }).countDocuments()
  this.requests = requests
  await this.save()
}

UserSchema.methods.incrementRequests = async function () {
  this.requests += 1
  await this.save()
}

UserSchema.methods.compareLastRequest = async function () {
  //should either return true, or it should return the amount of time needed to wait until the next request can be made
  const lastRequest = this.updatedAt
  if (lastRequest) {
    const lastRequestDate = new Date(lastRequest)
    const currentDate = new Date()
    const difference = Math.abs(currentDate - lastRequestDate)
    if (difference > 1000 * 60 * 60 * 12) {
      return true
    }
  }
  return Math.abs(difference - 1000 * 60 * 60 * 12)
}

UserSchema.methods.calculateNextRequest = async function () {
  console.log('in calculate next request')
  const lastRequest = this.updatedAt
  if (lastRequest) {
    const lastRequestDate = new Date(lastRequest)
    const currentDate = new Date()
    const difference = Math.abs(currentDate - lastRequestDate)
    if (difference > 1000 * 60 * 60 * 12) {
      return true
    }
    if (difference < 1000 * 60 * 60 * 12) {
      return Math.abs(difference - 1000 * 60 * 60 * 12)
    }
  }
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
