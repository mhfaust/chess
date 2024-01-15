import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/app/_db';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import Github from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
	throw Error('Missing Google OAuth Credentials');
}
if (!FACEBOOK_CLIENT_ID || !FACEBOOK_CLIENT_SECRET) {
	throw Error('Missing Facebook OAuth Credentials');
}
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
	throw Error('Missing Github OAuth Credentials');
}

export const {
	handlers: { GET, POST },
	auth,
	signOut,
	signIn,
} = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
		}),
		Github({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		// async signIn({user, account, profile}) {
		// },
		async jwt({ token, user, account, profile, isNewUser }) {
			if (isNewUser) {
				token.firstTimeLogin = true;
			}
			return token;
		},
		// Usually not needed, here we are fixing a bug in nextauth
		async session({ session, user }) {
			if (session?.user && user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	debug: process.env.NODE_ENV === 'development',
});

// async function checkIfUserIsNew(email?: string) {
// 	const user = await db.user.findUnique({
// 		where: { email },
// 	});

// 	// If user is not found, it means it's a new user
// 	return !user;
// }
