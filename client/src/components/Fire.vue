<template>
  <div :key="componentKey">
    <table cellpadding="0" cellspacing="0">
      <tr v-for="row in fireHeight" :key="row">
        <td v-for="column in fireWidth" :key="column">
          <div class="pixel-index">{{ column - 1 + (row - 1) * fireWidth }}</div>
          {{ firePixelsArray[column - 1 + (row - 1) * fireWidth] }}
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
      decay: 1,
      componentKey: 0,
      fireTime: 300,
      fireColorsPalette: [
        { r: 7, g: 7, b: 7 },
        { r: 31, g: 7, b: 7 },
        { r: 47, g: 15, b: 7 },
        { r: 71, g: 15, b: 7 },
        { r: 87, g: 23, b: 7 },
        { r: 103, g: 31, b: 7 },
        { r: 119, g: 31, b: 7 },
        { r: 143, g: 39, b: 7 },
        { r: 159, g: 47, b: 7 },
        { r: 175, g: 63, b: 7 },
        { r: 191, g: 71, b: 7 },
        { r: 199, g: 71, b: 7 },
        { r: 223, g: 79, b: 7 },
        { r: 223, g: 87, b: 7 },
        { r: 223, g: 87, b: 7 },
        { r: 215, g: 95, b: 7 },
        { r: 215, g: 95, b: 7 },
        { r: 215, g: 103, b: 15 },
        { r: 207, g: 111, b: 15 },
        { r: 207, g: 119, b: 15 },
        { r: 207, g: 127, b: 15 },
        { r: 207, g: 135, b: 23 },
        { r: 199, g: 135, b: 23 },
        { r: 199, g: 143, b: 23 },
        { r: 199, g: 151, b: 31 },
        { r: 191, g: 159, b: 31 },
        { r: 191, g: 159, b: 31 },
        { r: 191, g: 167, b: 39 },
        { r: 191, g: 167, b: 39 },
        { r: 191, g: 175, b: 47 },
        { r: 183, g: 175, b: 47 },
        { r: 183, g: 183, b: 47 },
        { r: 183, g: 183, b: 55 },
        { r: 207, g: 207, b: 111 },
        { r: 223, g: 223, b: 159 },
        { r: 239, g: 239, b: 199 },
        { r: 255, g: 255, b: 255 }
      ]
    };
  },
  created() {
    this.createFireDataStructure();
    this.createFireSource();
  },
  mounted() {
    setInterval(() => {
      this.calculateFirePropagation();
    }, this.fireTime);
  },
  methods: {
    createFireDataStructure() {
      const numberOfPixels = this.fireWidth * this.fireHeight;
      this.firePixelsArray = new Array(numberOfPixels).fill(0);
    },
    createFireSource() {
      for (let column = 0; column <= this.fireWidth; column++) {
        const overflowPixelIndex = this.fireWidth * this.fireHeight;
        const pixelIndex = overflowPixelIndex - this.fireWidth + column;
        this.firePixelsArray[pixelIndex] = 36;
      }
    },
    calculateFirePropagation() {
      for (let column = 0; column < this.fireWidth; column++) {
        for (let row = 0; row < this.fireHeight; row++) {
          const pixelIndex = column + this.fireWidth * row;
          this.updateFireIntensityPerPixel(pixelIndex);
        }
      }
    },
    updateFireIntensityPerPixel(currentPixelIndex) {
      const belowPixelIndex = currentPixelIndex + this.fireWidth;
      if (belowPixelIndex >= this.fireWidth * this.fireHeight) {
        return;
      }
      const belowPixelFireIntensity = this.firePixelsArray[belowPixelIndex];
      const newFireIntensity =
        belowPixelFireIntensity - this.decay >= 0
          ? belowPixelFireIntensity - this.decay
          : 0;
      // this.firePixelsArray[currentPixelIndex] = newFireIntensity;
      this.$set(this.firePixelsArray, currentPixelIndex, newFireIntensity);
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
