export default function EncodeParams<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
>(obj: T): string {
  return Object.entries(obj)
    .map((value) =>
      typeof value[1] === 'string' ||
      typeof value[1] === 'number' ||
      typeof value[1] === 'boolean'
        ? `${value[0]}=${encodeURIComponent(value[1])}`
        : `${value[0]}=${encodeURIComponent(JSON.stringify(value[1]))}`,
    )
    .join('&');
}
