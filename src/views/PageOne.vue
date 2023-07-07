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
          <van-collapse-item name="7" :is-link="false">
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
::v-deep .van-cell {
  padding: 0 !important;
}
.van-collapse-item__title .van-cell__right-icon::before {
  transform: rotate(0deg);
}
.van-collapse-item__title--expanded .van-cell__right-icon::before {
  transform: rotate(90deg);
}
</style>
