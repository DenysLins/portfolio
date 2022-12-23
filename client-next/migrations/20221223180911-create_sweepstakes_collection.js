module.exports = {
  async up(db) {
    await db.createCollection("sweepstakes", {});
  },

  async down(db) {
    await db.collection("sweepstakes").drop();
  },
};
