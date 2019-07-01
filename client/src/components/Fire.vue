<template>
  <div>
    <table cellpadding="0" cellspacing="0">
      <tr v-for="row in fireHeight" :key="row">
        <td v-for="column in fireWidth" :key="column">{{ (column - 1) + ( (row - 1) * fireWidth) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firePixelsArray: [],
      fireWidth: 2,
      fireHeight: 3
    };
  },
  mounted() {
    this.createFireDataStructure();
  },
  methods: {
    createFireDataStructure() {
      const numberOfPixels = this.fireWidth * this.fireHeight;
      this.firePixelsArray = new Array(numberOfPixels).fill(0);
    },
    calculateFirePropagation() {},
    renderFire() {}
  }
};
</script>

<style>
</style>
