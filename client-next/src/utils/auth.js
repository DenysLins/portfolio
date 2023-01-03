import { getSession } from 'next-auth/react';

export const isUserAdmin = async () => {
  const session = await getSession();
  return session?.user?.userRol === 'admin';
};
