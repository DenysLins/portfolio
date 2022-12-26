module.exports = {
  async up(db) {
    await db.collection("User").createIndex({ email: 1 }, { unique: true });
  },

  async down(db) {
    await db.collection("User").dropIndex({ email: 1 });
  },
};
