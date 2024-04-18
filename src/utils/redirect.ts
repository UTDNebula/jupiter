import { headers } from 'next/headers';

export function signInRoute(route: string) {
  const host = headers().get('X-Forwarded-Host');
  const proto = headers().get('X-Forwarded-Proto');
  return `/auth?callbackUrl=${encodeURIComponent(
    `${proto}://${host}/${route}`,
  )}`;
}
