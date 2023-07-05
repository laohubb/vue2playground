<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="标题1" name="1" icon="chat-o">
        <van-collapse v-model="activeNames2">
          <van-collapse-item title="标题1" name="7">内容</van-collapse-item>
          <van-collapse-item title="标题2" name="8">内容</van-collapse-item>
          <van-collapse-item title="标题3" name="9">内容</van-collapse-item>
        </van-collapse>
      </van-collapse-item>
      <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      activeNames2: ["7"],
    };
  },
  methods: {},
};
</script>

<style lang="scss"></style>
