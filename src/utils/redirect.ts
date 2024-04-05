import { env } from 'process';

export function signInRoute(route: string) {
  return `/auth?callbackUrl=${encodeURIComponent(
    `${env.NEXTAUTH_URL}/${route}`,
  )}`;
}
