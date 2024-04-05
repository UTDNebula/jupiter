import { env } from '@src/env.mjs';

export function signInRoute(route: string) {
  return `/auth?callbackUrl=${encodeURIComponent(
    `${env.NEXTAUTH_URL}/${route}`,
  )}`;
}
