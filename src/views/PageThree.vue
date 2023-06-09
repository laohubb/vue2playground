<template>
  <div>
    <custom-button type="info">普通</custom-button>
    <custom-button disabled>禁用</custom-button>
    <custom-button plain>空心</custom-button>
    <custom-button plain disabled>空心禁用</custom-button>
    <custom-button size="large">大号</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/CustomButton";
export default {
  name: "PageFive.vue",
  components: {
    CustomButton,
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>
