<template>
  <div class="home">
    <QRCode text="1234"/>
  </div>
</template>

<script>
import QRCode from "@/components/QRCode.vue";

export default {
  components: {
    QRCode
  }
};
</script>
