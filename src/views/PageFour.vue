<template>
  <div ref="elem" class="container">
    <van-cell is-link @click="show = true">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup>
    <div class="content">
      {{ left }}

      <div style="width: 50vw">elemRect{{ elemRect }}</div>
      <div>touchstartX{{ touchstartX }}</div>
      <div>touchendX{{ touchendX }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageFour",
  mounted() {
    const elem = this.$refs.elem;
    function preventTouchMove(event) {
      event.preventDefault();
    }
    const onTouchStart = (event) => {
      this.touchstartX = event.touches[0].clientX;
      if (this.touchstartX < 50) {
        this.left = true;
        elem.addEventListener("touchmove", preventTouchMove, {
          passive: false,
        });
      } else {
        this.left = false;
        elem.removeEventListener("touchmove", preventTouchMove);
      }
    };

    elem.addEventListener("touchstart", onTouchStart);

    this.$once("hook:beforeDestroy", () => {
      elem.removeEventListener("touchstart", onTouchStart);
    });
  },
  data() {
    return {
      show: false,
      touchstartX: 0,
      touchendX: 0,
      left: false,
      elemRect: {},
    };
  },
  methods: {
    preventBack() {},
    yidong() {
      console.log("边缘移动");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 120vh;
  /*border: 1px solid red;*/
}

.content {
  /* 根据需要设置内容的样式 */
}
</style>
