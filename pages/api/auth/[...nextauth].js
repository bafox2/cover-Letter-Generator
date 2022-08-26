import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async registeToDB(session, token, user) {
      console(session, token, user, 'registeToDB params')
      // const user = await db.collection('users').findOne({ name })
      // if (user) {
      //   return res.status(400).json({ message: 'User already exists' })
      // }
      // await db.collection('users').insertOne({ name, email })
      // return res.status(200).json({ message: 'User created' })
    },
  },
})
