import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { apiPaths } from '../app/api/apiConstants';
import { toast } from 'react-toastify';

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${apiPaths.baseUrl}${apiPaths.login}`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          if (data.errors) {
            console.log(data.errors);
            // throw data;
            return null;
          }
          if (!data?.errors && data) {
            return {
              id: data.id,
              email: data.email,
              token: data.tokens.access,
            };
          }
          return null;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log('testing', user);
      // if (trigger == 'update') {
      //   const response = await fetch(
      //     `${apiPaths.baseUrl}${apiPaths.profileUrl}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         authorization: `Bearer ${token.token}`,
      //         accept: 'application/json',
      //       },
      //     }
      //   );
      //   if (response.ok) {
      //     const responseData = await response.json();
      //     token.name = responseData.data.user.name;
      //     token.profile_image = responseData.data.user.profile_image;
      //     return Promise.resolve(token);
      //   }
      // }

      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.email = user.email;
        console.log(token);
      }
      console.log(token);

      return Promise.resolve(token);
    },

    async session({ session, token }) {
      session.user = token;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/dashboard',
  },
};
