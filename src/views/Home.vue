<template>
  <div class="home">
    <ToggleKeys :keys="schemaList[0].keys"/>
    <QRCode text="1234"/>
  </div>
</template>

<script>
import QRCode from "@/components/QRCode.vue";
import ToggleKeys from "@/components/ToggleKeys.vue";

export default {
  components: {
    QRCode,
    ToggleKeys
  },
  data() {
    return {
      schemaList: this.$state.schemaList
    };
  }
};
</script>
