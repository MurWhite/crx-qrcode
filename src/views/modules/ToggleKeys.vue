<template>
  <div class="schema-keys-toggle-wrap">
    <span v-for="(key, index) in keys"
          class="key-item"
          :class="{active: keysOption[key.name] === key.truthValue}"
          @click="handleKeyToggle(key)"
          :key="index">{{key.name}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keysOption: {}
    };
  },
  computed: {
    keys() {
      return this.$state.currentSchema.keys;
    }
  },
  watch: {
    keys: {
      immediate: true,
      deep: true,
      handler(to) {
        if (to && Array.isArray(to)) {
          const tempKeysOpt = {};
          to.map(key => {
            const tempVal = this.keysOption[key.name];
            tempKeysOpt[key.name] =
              tempVal === key.truthValue ? key.truthValue : key.falseValue;
          });
          this.keysOption = tempKeysOpt;
          this.updateQRText();
        }
      }
    }
  },
  methods: {
    handleKeyToggle(eventKey) {
      const curVal = this.keysOption[eventKey.name];
      this.keysOption[eventKey.name] =
        eventKey.truthValue === curVal
          ? eventKey.falseValue
          : eventKey.truthValue;
      this.updateQRText();
    },
    updateQRText() {
      this.$actions.updateQRText(location.href, this.keysOption);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variable.scss";

.schema-keys-toggle-wrap {
  text-align: center;
  .key-item {
    display: inline-block;
    border: 1px solid $baseColor;
    padding: 2px 4px;
    border-radius: 2px;
    margin: 5px;
    color: $baseColor;

    &.active {
      color: #fff;
      background-color: $baseColor;
    }
  }
}
</style>
