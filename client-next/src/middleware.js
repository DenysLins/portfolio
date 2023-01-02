import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === '/projects/sweepstakes/admin') {
        return token?.userRole === 'admin';
      }
    },
  },
  pages: {
    signIn: '/projects/sweepstakes',
    signOut: '/projects/sweepstakes/auth/login',
  },
});

export const config = { matcher: ['/projects/sweepstakes/admin'] };
