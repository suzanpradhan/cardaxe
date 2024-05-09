import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { apiPaths } from '../api/apiConstants';

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
        const res = await fetch(`${apiPaths.baseUrl}${apiPaths.loginUrl}`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json()
        if (res.ok && user) {
          return {
            id: user.id,
            email: user.email,
            token: user.tokens.access,
            image: user.image,
            name: user.name
          }
        }
        return null
        // try {
        //   const res = await fetch(`${apiPaths.baseUrl}${apiPaths.loginUrl}`, {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { 'Content-Type': 'application/json' },
        //   });
        //   const data = await res.json();
        //   console.log("data", data)
        //   if (data.errors) {
        //     console.log("logged not", data.errors[0])
        //     return data.errors[0];
        //   }
        //   if (!data?.errors && data) {
        //     console.log("logged ijnt", data)
        //     return {
        //       token: data.optional.token,
        //       ...data.data,
        //     };
        //   }
        //   return null;
        // } catch (err) {
        //   return null;
        // }
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
      console.log("jwt", token, user, trigger)
      if (trigger == 'update') {
        const response = await fetch(
          `${apiPaths.baseUrl}${apiPaths.profileUrl}`,
          {
            method: 'GET',
            headers: {
              authorization: `Bearer ${token.token}`,
              accept: 'application/json',
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          token.name = responseData.data.user.name;
          token.profile_image = responseData.data.user.profile_image;
          return Promise.resolve(token);
        }
      }

      if (user) {
        console.log("user", user)
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
        token.profile_image = user.image;
        token.email = user.email;
      }
      return Promise.resolve(token);
    },

    async session({ session, token }) {
      session.user = token;
      console.log("session", session)
      return Promise.resolve(session);
    },

  },
  pages: {
    signIn: '/login',
    signOut: '/dashboard',
  },
};
