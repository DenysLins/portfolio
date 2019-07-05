<template>
  <div class="flex-item">
    <div>
      <label for="range-1">Direção do vento</label>
      <b-form-input id="range-1" v-model="value" type="range" min="0" max="4"></b-form-input>
    </div>
    <table cellpadding="0" cellspacing="0">
      <tr v-for="row in fireHeight" :key="row">
        <td
          v-for="column in fireWidth"
          :key="column"
          :style="{ backgroundColor: getStyle(row, column)}"
          class="pixel"
        >
          <!-- <div class="pixel-index">{{ column - 1 + (row - 1) * fireWidth }}</div> -->
          <!-- {{ firePixelsArray[column - 1 + (row - 1) * fireWidth] }} -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "2",
      firePixelsArray: [],
      fireWidth: 90,
      fireHeight: 30,
      pixelIndex: 0,
      decay: 3,
      wind: 0,
      fireTime: 5,
      colors: 18,
      fireColorsPalette: [
        { r: 7, g: 7, b: 7 },
        // { r: 31, g: 7, b: 7 },
        { r: 47, g: 15, b: 7 },
        // { r: 71, g: 15, b: 7 },
        { r: 87, g: 23, b: 7 },
        // { r: 103, g: 31, b: 7 },
        { r: 119, g: 31, b: 7 },
        // { r: 143, g: 39, b: 7 },
        { r: 159, g: 47, b: 7 },
        // { r: 175, g: 63, b: 7 },
        { r: 191, g: 71, b: 7 },
        // { r: 199, g: 71, b: 7 },
        { r: 223, g: 79, b: 7 },
        // { r: 223, g: 87, b: 7 },
        { r: 223, g: 87, b: 7 },
        // { r: 215, g: 95, b: 7 },
        { r: 215, g: 95, b: 7 },
        // { r: 215, g: 103, b: 15 },
        { r: 207, g: 111, b: 15 },
        // { r: 207, g: 119, b: 15 },
        { r: 207, g: 127, b: 15 },
        // { r: 207, g: 135, b: 23 },
        { r: 199, g: 135, b: 23 },
        // { r: 199, g: 143, b: 23 },
        { r: 199, g: 151, b: 31 },
        // { r: 191, g: 159, b: 31 },
        { r: 191, g: 159, b: 31 },
        // { r: 191, g: 167, b: 39 },
        { r: 191, g: 167, b: 39 },
        // { r: 191, g: 175, b: 47 },
        { r: 183, g: 175, b: 47 },
        // { r: 183, g: 183, b: 47 },
        { r: 183, g: 183, b: 55 },
        // { r: 207, g: 207, b: 111 },
        { r: 223, g: 223, b: 159 },
        // { r: 239, g: 239, b: 199 },
        { r: 255, g: 255, b: 255 }
      ],
      debug: false
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
        this.firePixelsArray[pixelIndex] = this.colors;
      }
    },
    calculateFirePropagation() {
      for (let column = 0; column < this.fireWidth; column++) {
        for (let row = 0; row < this.fireHeight; row++) {
          const pixelIndex = column + this.fireWidth * row;
          this.updateFireIntensityPerPixel(pixelIndex);
        }
      }
      console.log("wind " + this.wind);
      console.log("value " + this.value);
    },
    updateFireIntensityPerPixel(currentPixelIndex) {
      const belowPixelIndex = currentPixelIndex + this.fireWidth;
      if (belowPixelIndex >= this.fireWidth * this.fireHeight) {
        return;
      }

      switch (this.value) {
        case "0":
          this.wind = -2;
          break;
        case "1":
          this.wind = -1;
          break;
        case "2":
          this.wind = 0;
          break;
        case "3":
          this.wind = 1;
          break;
        case "4":
          this.wind = 2;
          break;
        default:
          this.wind = 0;
          break;
      }

      const tempDecay = Math.floor(Math.random() * this.decay);
      const belowPixelFireIntensity = this.firePixelsArray[belowPixelIndex];
      const newFireIntensity =
        belowPixelFireIntensity - tempDecay >= 0
          ? belowPixelFireIntensity - tempDecay
          : 0;

      const tempWind =
        this.wind == 0
          ? this.wind
          : Math.floor(Math.random() * (Math.abs(this.wind) + 1));

      if (this.wind < 0) {
        this.$set(
          this.firePixelsArray,
          currentPixelIndex - tempWind,
          newFireIntensity
        );
      } else {
        this.$set(
          this.firePixelsArray,
          currentPixelIndex + tempWind,
          newFireIntensity
        );
      }
    },
    getStyle(row, column) {
      if (!this.debug && this.firePixelsArray && this.fireColorsPalette) {
        const pixelIndex = column - 1 + this.fireWidth * (row - 1);
        const fireIntensity = this.firePixelsArray[pixelIndex];
        const color = this.fireColorsPalette[fireIntensity];
        const colorString = `rgb(${color.r},${color.g},${color.b})`;
        return colorString;
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.flex-item {
  flex-direction: column;
  text-align: center;
}

table {
  /* border-collapse: collapse; */
  /* border: 1px solid #000; */
}

td {
  width: 10px;
  height: 10px;
  /* border: 1px solid #000; */
  /* text-align: center; */
  /* font-family: monospace; */
  /* vertical-align: center; */
  /* font-size: 18px; */
  /* position: relative; */
}

/* .pixel-index {
  font-size: 10px;
  display: inline-block;
  position: absolute;
  top: 2px;
  right: 2px;
  color: #fff;
} */
</style>
