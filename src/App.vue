<template>
  <div id="app">
    <div class="navgation">
      <router-link to="/">
        <i class="icon icon-qrcode"></i>
      </router-link>
      <router-link to="/setting">
        <i class="icon icon-setting"></i>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: this.$state
    };
  },
  created() {
    this.$actions.initalData();
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  padding-top: 24px;
  background-color: #ffffff;
  max-width: 400px;
  margin: 0 auto;
  .navgation {
    position: absolute;
    right: 0;
    top: 0;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        display: none;
      }
    }
  }
}
</style>
