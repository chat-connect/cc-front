import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
  pages: {
    signIn: '/',
  },
  providers: [
    // @ts-ignore .default
    CredentialsProvider.default({
      authorize(credentials: { email: string, password: string }) {
        return {
          id: 1,
          name: 'name',
          username: 'username',
          email: credentials.email,
          image: 'https://avatars.githubusercontent.com/u/23360933?s=64&v=4',
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log(session, token, user)

      session.user.id = +token?.sub
      session.user.username = 'username2'

      return session
    },
  },
})
