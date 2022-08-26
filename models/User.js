import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
  },
  { collection: 'users' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
