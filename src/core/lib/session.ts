import { SessionOptions } from 'iron-session'
import type { ISessionData } from '@/core/lib/types'

export const defaultSession: ISessionData = {
  isLoggedIn: false,
  user: null
}

export const sessionOptions: SessionOptions = {
  password: `appsegura-456138718-654987654-${crypto.randomUUID()}`,
  cookieName: 'appsegura-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}
