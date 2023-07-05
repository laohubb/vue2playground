<template>
  <div style="margin-top: 10px">
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1" :is-link="false">
        <template #title>
          <div>
            <i class="van-icon van-icon-arrow van-cell__right-icon" />系统分组
          </div>
        </template>
        <van-collapse v-model="activeNames2">
          <van-collapse-item title="标题1" name="7" :is-link="false">
            <template #title>
              <div>
                <i class="van-icon van-icon-arrow van-cell__right-icon" />标签1
              </div>
            </template>
            内容
          </van-collapse-item>
        </van-collapse>
      </van-collapse-item>
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

<style lang="less" scoped>
[class*="van-hairline"]::after {
  border: unset !important;
}
::v-deep .van-collapse-item__title--expanded::after {
  border: unset !important;
}
</style>
