<template>
  <van-button
    v-on="$listeners"
    :type="type"
    :disabled="disabled"
    :plain="plain"
    :size="size"
    ><slot
  /></van-button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "info",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.van-button {
  border-radius: 8px;
  width: 110px;
  height: 46px;
  font-size: 16px;
  color: #ffffff;
}
.van-button--info {
  background-color: #3c6cfe;
  border: 1px solid #3c6cfe;
}
.van-button--disabled {
  background-color: #3c6cfe;
  border: 1px solid #3c6cfe;
  opacity: 0.5;
}
.van-button--plain {
  background-color: #ffffff;
  border: 1px solid #3c6cfe;
  color: #3c6cfe;
}
.van-button--large {
  width: 312px;
}
</style>
