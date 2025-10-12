import NextAuth, { NextAuthOptions } from "next-auth"; // Importe NextAuthOptions
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

declare module "next-auth" {
    interface User {
        id: string;
        token: string;
        name: string;
        email: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        token: string;
        name: string;
        email: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(
                        "http://localhost:8000/api/login",
                        {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                        {
                            withCredentials: true,
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const user = res.data.user;
                    const token = res.data.token;

                    if (res.status === 200 && user && token) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token: token,
                        };
                    } else {
                        return null;
                    }
                } catch (e) {
                    console.error("Erro no login:", e);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.token = token.token as string;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };