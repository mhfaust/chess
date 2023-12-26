import 'next-auth';
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    firstTimeLogin?: boolean; // Custom property
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: {
      accessToken: string | undefined
      refreshToken: string | undefined
    }
  }
}