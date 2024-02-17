import NextAuth, { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      // if (user) token.role = 'admin'
      // if (user) token.role = 'partner'
      return token
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      // if (session?.user) session.user.role = 'admin'
      // if (session?.user) session.user.role = 'partner'
      return session
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }