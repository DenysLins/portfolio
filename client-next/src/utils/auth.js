const isUserAdmin = (session) => {
  return session?.user?.userRole === 'admin';
};

export { isUserAdmin };
