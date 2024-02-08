import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useReducer } from 'react';
import { type z } from 'zod';

function EncodeParams<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, string | Array<any> | Record<string, any>>,
>(obj: T): string {
  return Object.entries(obj)
    .map((value) =>
      typeof value[1] === 'string'
        ? `${value[0]}=${encodeURIComponent(value[1])}`
        : `${value[0]}=${encodeURIComponent(JSON.stringify(value[1]))}`,
    )
    .join('&');
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSearch = <T extends z.SomeZodObject>(schema: T) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [params, setParams] = useReducer(
    (state: z.infer<typeof schema>, action: Partial<z.infer<T>>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries(action).map((value: [keyof z.infer<T>, any]) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state[value[0]] = value[1];
      });
      return { ...state };
    },
    null,
    () => {
      const temp: Record<string, unknown> = {};
      Object.keys(schema.shape).map((key) => {
        temp[key] = searchParams.get(key) ?? undefined;
      });
      return schema.parse(temp);
    },
  );
  useEffect(() => {
    const temp: Record<string, unknown> = {};
    Object.keys(schema.shape).map((key) => {
      temp[key] = searchParams.get(key) ?? undefined;
    });
    const parsed = schema.parse(temp);
    setParams(parsed);
  }, [searchParams, schema]);
  useEffect(() => {
    const enc = EncodeParams(params);
    router.push(`${pathname}?${enc}`);
  }, [params, router, pathname]);
  return [params, setParams] as const;
};
export default useSearch;
