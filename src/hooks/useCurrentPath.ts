import { useRouter } from 'next/router';

// Gets the current path from the slug param (if this is a dynamic route) or the
// router pathname (if this is a static route)
export const useCurrentPath = () => {
  const { query, pathname } = useRouter();

  return query.slug ? query.slug.toString() : pathname;
};
