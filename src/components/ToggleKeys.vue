<template>
    <div class="schema-keys-toggle-wrap">
        <span class="key-item">标题</span>
        <span class="key-item active">标题</span>
        <span v-for="(key, index) in keys" class="key-item" 
              :class="{active: keysOption[key] === key.truthValue}" 
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
  props: {
    keys: Array
  },
  watch: {
    keys: {
      immediate: true,
      deep: true,
      handler(to) {
        if (to && Array.isArray(to)) {
          const tempKeysOpt = {};
          to.map(key => {
            tempKeysOpt[key.name] = this.keysOption[key.name];
          });
          this.keysOption = tempKeysOpt;
        }
      }
    }
  },
  methods: {
    handleKeyToggle(eventKey) {
      this.keysOption[key.name] = this.keys.filter(
        key => eventKey.name === key.name
      )[0];
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
