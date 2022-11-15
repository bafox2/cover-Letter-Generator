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
  jwt: true,
  // callbacks: {
  //   session: async (session, token) => {
  //     if (!session || !session.user || !token || !token.user) {
  //       return Promise.resolve(session);
  //     }

  //     session.user.id = token.user.id;
  //     return Promise.resolve(session);
  //   },
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     console.log('jwt', token, account, 'jwt')
  //     if (account) {
  //       token.accessToken = account.access_token
  //     }
  //     return token
  //   },
  //   async session({ session, token, user }) {
  //     console.log(session, token, user, 'session')
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken
  //     return session
  //   },
  //   async signIn({ user, account, profile, email, credentials }) {
  //     await dbConnect()
  //     const existingUser = await User.findOne({
  //       name: user.name,
  //     })
  //     if (existingUser) {
  //       console.log('user exists')
  //       return true
  //     }

  //     const newUser = await User.create({
  //       name: user.name,
  //       avatar: user.image,
  //       requests: 0,
  //     })

  //     return true
  //   },
  // },
})

// import NextAuth from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
// import dbConnect from '../../../lib/dbConnect'
// import User from '../../../models/User'

// export default NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: '/signin',
//   },
  // logger: {
  //   error(code, metadata) {
  //     console.log(code, metadata, 'error')
  //   },
  //   warn(code) {
  //     console.log(code, 'warn')
  //   },
  //   debug(code, metadata) {
  //     console.log(code, metadata, 'debug')
  //   }
  // },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
    // async jwt({ token, account }) {
    //   // Persist the OAuth access_token to the token right after signin
    //   if (account) {
    //     token.accessToken = account.access_token
    //   }
    //   return token
    // },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.accessToken = token.accessToken
    //   return session
    // },
//     // async signIn({ user, account, profile, email, credentials }) {
//     //   await dbConnect()
//     //   const existingUser = await User.findOne({
//     //     name: user.name,
//     //   })
//     //   if (existingUser) {
//     //     console.log('user exists')
//     //     return true
//     //   }

//     //   const newUser = await User.create({
//     //     name: user.name,
//     //     avatar: user.image,
//     //     requests: 0,
//     //   })
//     //   console.log('new user created')
//     //   return true
//     // },

//   },
// })
