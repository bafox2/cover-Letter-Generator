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
  const lastRequest = this.updatedAt
  if (lastRequest) {
    const lastRequestDate = new Date(lastRequest)
    const currentDate = new Date()
    const difference = Math.abs(currentDate - lastRequestDate)
    if (difference > 1000 * 60 * 60 * 12) {
      return true
    }
  }

  return false
}

export default mongoose.models.User || mongoose.model('User', UserSchema)

//compare last request for user should be 12 hours
//i should display the last request if it is unavailable for someone looking to try the guest account
