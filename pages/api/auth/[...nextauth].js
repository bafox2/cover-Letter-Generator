import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  logger: {
    error(code, metadata) {
      log.error(code, metadata)
    },
    warn(code) {
      log.warn(code)
    },
    debug(code, metadata) {
      log.debug(code, metadata)
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbConnect()
      const existingUser = await User.findOne({
        name: user.name,
      })
      if (existingUser) {
        console.log('user exists')
        return true
      }

      const newUser = await User.create({
        name: user.name,
        avatar: user.image,
        requests: 0,
      })
      newUser

      return true
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (token) {
    //     session.id = token.id;
    //   }
    //   return session;
    // }
  },
})
