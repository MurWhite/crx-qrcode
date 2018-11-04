<template>
  <div class="popup-input-wrap">
    <div class="input-wrap">
      <input :type="type"
             v-model="inputVal" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputVal: ""
    };
  },
  props: {
    value: null,
    type: String
  },
  watch: {
    value: {
      immediate: true,
      handler(to) {
        this.inputVal = to;
      }
    }
  },
  methods: {
    handleInput() {}
  }
};
</script>
<style lang="scss" scoped>
.popup-input-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  .input-wrap {
    background-color: #fff;
  }
}
</style>
