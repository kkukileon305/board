import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: '120101080819-n95h7782aji3ilpg5b5n0rmm8fvsep3o.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
};

export default NextAuth(authOption);
