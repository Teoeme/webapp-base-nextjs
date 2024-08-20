import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import userModel from "../../../models/user";
import { comparePasswords } from "../sessionUtils";
import { connectToMainDB } from "../../utils/database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email de usuario",
        },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToMainDB();
        const userFinded = await userModel.findOne({
          Email: credentials.email,
        }).lean();
        const verifyPass = await comparePasswords(
          credentials.password,
          userFinded?.Password
        );

        if (verifyPass) {
          return { ...userFinded, Password: "" };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      user.name=user.Name
      user.id=user._id
      return user;
    },
  

    async session(session, token, user) {
      await connectToMainDB();
      const userFinded = await userModel.findOne({
        _id:session.token?.sub
      }).lean();
      session.user={...userFinded,Password:undefined}
      session.accessToken = jwt.sign(
        { data: { _id: session.token.sub, name: session.token.name } },
        process.env.NEXTAUTH_SECRET
      );
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }

  },
};
