import { headers } from 'next/headers';

export const getUserFromHeader = () => {
  const headersList = headers();
  const user = headersList.get('x-user');

  return user;
};
