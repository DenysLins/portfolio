module.exports = {
  async up(db) {
    await db.createCollection("User", {});
  },

  async down(db) {
    await db.collection("User").drop();
  },
};
