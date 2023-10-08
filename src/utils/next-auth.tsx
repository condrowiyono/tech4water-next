import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { setCookie } from "./cookies";

export const authOptions: AuthOptions = {
  secret: "sakral sekali ini secret nya",
  theme: {
    logo: "/image/pu.png",
    buttonText: "Masuk",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Kata Sandi" },
      },
      async authorize(credentials) {
        const res = await fetch("https://water.orbitallabs.net/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          // set additional cookies
          console.log(user.data.token);

          return {
            ...user.data.user,
            token: user.data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
