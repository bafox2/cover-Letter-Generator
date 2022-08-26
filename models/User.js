import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,

    queries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query',
      },
    ],
  },
  { collection: 'users' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
