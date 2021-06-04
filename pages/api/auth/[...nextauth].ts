import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            session.userId = user.id;
            return Promise.resolve(session);
        }
    },
    database: process.env.DATABASE_URL,
});