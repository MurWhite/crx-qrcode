<template>
  <div class="home">
    <ToggleSchema />
    <ToggleKeys />
    <QRCode :text="$state.qrcodeText" />
  </div>
</template>

<script>
import QRCode from "@/components/QRCode.vue";
import ToggleKeys from "./modules/ToggleKeys.vue";
import ToggleSchema from "./modules/ToggleSchema.vue";

export default {
  components: {
    QRCode,
    ToggleKeys,
    ToggleSchema
  },
  data() {
    return {
      schemaList: this.$state.schemaList
    };
  },
  mounted() {
    this.$actions.changeCurrentSchema(0);
  },
  methods: {
    handleKeyOptionsUpdate(options) {
      this.$actions.changeCurrentSchema(1);
    }
  }
};
</script>
