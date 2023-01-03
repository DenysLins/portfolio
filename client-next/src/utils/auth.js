const isUserAdmin = (session) => {
  console.log(session);
  return session?.user?.userRole === 'admin';
};

export { isUserAdmin };
