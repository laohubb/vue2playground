<template>
  <div>
    <van-field
      @keyup.enter="handleEnter"
      v-model="value"
      label="文本"
      placeholder="请输入用户名"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    handleEnter() {
      this.$toast("回车键被点击");
      console.log("hello");
    },
  },
};
</script>

<style lang="scss"></style>
