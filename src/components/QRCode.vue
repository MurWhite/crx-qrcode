<template>
    <div class="qrcode-wrap">
      <img :src="qrcodeDataUrl">
    </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      qrcodeDataUrl: ""
    };
  },
  props: {
    text: {
      type: String,
      default: "没有任何东西"
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(to) {
        QRCode.toDataURL(to)
          .then(dUrl => (this.qrcodeDataUrl = dUrl))
          .catch(err => (this.qrcodeDataUrl = "发生异常，请联系开发者"));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.qrcode-wrap {
  img {
    width: 100%;
  }
}
</style>
