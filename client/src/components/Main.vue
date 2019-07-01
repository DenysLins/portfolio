<template>
  <div class="flex-container">
    <div class="title">
      <h1>{{ msg }}</h1>
      <h2>Software Developer</h2>
      <p>denyslins@gmail.com</p>
    </div>
    <app-fire class="fire"></app-fire>
  </div>
</template>

<script>
import Fire from "./Fire.vue";

export default {
  data() {
    return {
      msg: "Denys Lins"
    };
  },
  components: {
    appFire: Fire
  }
};
</script>

<style>
.flex-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.title {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fire {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
