import { headers } from 'next/headers';

export const getPathnameServer = () => {
  const headersList = headers();
  const pathname = headersList.get('x-pathname');
  const queryParams = headersList.get('x-funnel');

  return { pathname, queryParams };
};
