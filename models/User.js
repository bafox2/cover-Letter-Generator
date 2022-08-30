import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
  },
  { collection: 'users', timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
