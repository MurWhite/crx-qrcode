<template>
  <div class="schema-toggle-wrap">
    <span v-for="(s, index) in $state.schemaList"
          v-if="$state.schemaList.length > 1"
          class="schema-item"
          :class="{active: s.ukey === $state.currentSchema.ukey}"
          :key="s.ukey"
          @click="$actions.changeCurrentSchema(index)">{{s.name}}</span>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/assets/variable.scss";
.schema-toggle-wrap {
  white-space: nowrap;
  overflow: auto;
  display: flex;
  justify-content: space-around;
  .schema-item {
    display: inline-block;
    border: 1px $baseColor solid;
    color: $baseColor;
    min-width: 60px;
    padding: 3px 5px;
    text-align: center;
    cursor: pointer;

    &.active {
      color: #fff;
      background-color: $baseColor;
    }
  }
}
</style>
