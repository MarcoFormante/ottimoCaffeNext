import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/');
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;