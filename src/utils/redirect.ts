import { headers } from 'next/headers';

export async function signInRoute(route: string) {
  const head = await headers();
  const host = head.get('X-Forwarded-Host');
  const proto = head.get('X-Forwarded-Proto');
  return `/auth?callbackUrl=${encodeURIComponent(
    `${proto}://${host}/${route}`,
  )}`;
}
