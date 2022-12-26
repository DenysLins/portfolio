module.exports = {
  async up(db) {
    await db.createCollection("Sweepstake", {});
  },

  async down(db) {
    await db.collection("Sweepstake").drop();
  },
};
