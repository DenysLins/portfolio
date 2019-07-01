<template>
  <div>
    <table cellpadding="0" cellspacing="0">
      <tr v-for="row in fireHeight" :key="row">
        <td v-for="column in fireWidth" :key="column">
          <div class="pixel-index">{{ calculatePixelIndex(column, row) }}</div>
          {{ firePixelsArray[pixelIndex] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firePixelsArray: [],
      fireWidth: 20,
      fireHeight: 10,
      pixelIndex: 0,
      decay: 1
    };
  },
  mounted() {
    this.createFireDataStructure();
    this.createFireSource();
    setInterval(this.calculateFirePropagation(), 1000);
  },
  methods: {
    createFireDataStructure() {
      const numberOfPixels = this.fireWidth * this.fireHeight;
      this.firePixelsArray = new Array(numberOfPixels).fill(0);
    },
    calculateFirePropagation() {
      for (let column = 0; column < this.fireWidth; column++) {
        for (let row = 0; row < this.fireHeight; row++) {
          const pixelIndex = column + this.fireWidth * row;
          this.updateFireIntensityPerPixel(pixelIndex);
        }
      }
    },
    renderFire() {},
    calculatePixelIndex(column, row) {
      this.pixelIndex = column - 1 + (row - 1) * this.fireWidth;
      return this.pixelIndex;
    },
    createFireSource() {
      for (let column = 0; column <= this.fireWidth; column++) {
        const overflowPixelIndex = this.fireWidth * this.fireHeight;
        const pixelIndex = overflowPixelIndex - this.fireWidth + column;
        this.firePixelsArray[pixelIndex] = 36;
      }
    },
    updateFireIntensityPerPixel(currentPixelIndex) {
      const belowPixelIndex = currentPixelIndex + this.fireWidth;
      if (belowPixelIndex >= this.fireWidth * this.fireHeight) {
        return;
      }
      const belowPixelFireIntensity = this.firePixelsArray[belowPixelIndex];
      const newFireIntensity = belowPixelFireIntensity - this.decay;
      this.firePixelsArray[currentPixelIndex] = newFireIntensity;
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border: 1px solid #fff;
}

td {
  width: 30px;
  height: 30px;
  border: 1px solid #fff;
  text-align: center;
  font-size: 12px;
  position: relative;
}

.pixel-index {
  font-size: 6px;
  display: inline-block;
  position: absolute;
  top: 2px;
  right: 2px;
  color: #fff;
}
</style>
