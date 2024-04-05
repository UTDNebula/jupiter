export function signInRoute(route: string) {
  return `/auth?callbackUrl=${encodeURIComponent(`${getBaseUrl()}/${route}`)}`;
}
export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
