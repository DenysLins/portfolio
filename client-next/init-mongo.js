/* eslint-disable no-undef */
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'admin',
    },
  ],
});
