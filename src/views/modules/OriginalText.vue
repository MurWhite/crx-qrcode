<template>
  <div class="original-text-input">
    <textarea v-model="text"></textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  watch: {
    text: {
      immediate: true,
      handler(to) {
        this.$actions.updateOriginalText(to);
      }
    }
  }
};
</script>
