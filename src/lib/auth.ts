import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins/jwt";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined in the environment variables. Set it in your deployment environment (e.g. Vercel project settings)."
  );
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("AIStudyMentor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
});
