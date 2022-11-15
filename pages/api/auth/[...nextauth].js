import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID2,
      clientSecret: process.env.GITHUB_SECRET2,
    }), GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  strategy: 'jwt',
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.log(code, metadata, 'error', code.message, code.name)
    },
    warn(code) {
      console.log(code, 'warn')
    },
    debug(code, metadata) {
      console.log(code, metadata, 'debug')
    }
  },
  callbacks: {
    async signIn({ user }) {
      await dbConnect()
      const existingUser = await User.findOne({
        name: user.name,
      })
      if (existingUser) {
        console.log('user exists')
        return true
      }

      await User.create({
        name: user.name,
        avatar: user.image,
        requests: 0,
      })
      return true
    },
  },
})

