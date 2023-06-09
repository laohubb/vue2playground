<template>
  <div>
    <span>哈哈哈,h12lkj3123</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minValue: "",
    };
  },
  methods: {
    validateMinValue(val) {
      if (val === "") {
        this.minValue = 1;
      }
    },
  },
};
</script>
<style lang="scss">
.card {
  margin: 10px auto;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(71, 105, 255, 0.1);
  .header {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px 8px 0 0;
    position: relative;
    .left {
      margin: 12px 0;
      padding: 0px 16px;
      border-left: 4px solid #3c6cfe;
      text-align: left;
      display: flex;
      align-items: center;
      font-size: 16px;
      h3 {
        font-weight: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-word;
        //word-break: break-all;
      }
    }

    .right {
      margin-left: auto;
      margin-right: 10px;
      .trash {
        height: 20px;
        width: 20px;
      }
    }
  }
}
.container {
  padding: 0 20px;
  &.padding {
    padding: 10px 20px;
  }
}
</style>
