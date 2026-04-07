import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL is inferred automatically in many environments, but can be set:
    // baseURL: process.env.NEXT_PUBLIC_APP_URL, 
});

export const { signIn, signOut, signUp, useSession } = authClient;
