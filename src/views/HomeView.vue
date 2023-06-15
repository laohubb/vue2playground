<template>
  <div>
    <div class="header" ref="headerRef">header</div>
    <div class="home" ref="homeRef">
      <!-- 其他内容 -->
      <div style="height: 500px"></div>
      <input @focus="handleInputFocus" @blur="handleInputBlur" />
      {{ headerTop }}1
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      isKeyboardVisible: false,
      headerTop: 0,
    };
  },
  mounted() {},
  methods: {
    getHeaderTop() {
      const headerElement = this.$refs.headerRef;
      const headerRect = headerElement.getBoundingClientRect();
      const headerTop = headerRect.top;
      this.headerTop = headerTop;
    },
    resizeChange() {},
    handleInputFocus() {
      this.isKeyboardVisible = true;
      const headerElement = this.$refs.headerRef;
      setTimeout(() => {
        this.getHeaderTop();
        headerElement.style.top = -this.headerTop + 20 + "px";
      }, 100);
    },
    handleInputBlur() {
      this.isKeyboardVisible = false;
      this.$refs.headerRef.style.top = 20 + "px";
    },
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  //top: 100px;
  width: 100%;
  height: 50px;

  background-color: #f3aeae;
}
</style>
