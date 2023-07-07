<template>
  <div>
    <el-cascader
      :options="options"
      v-model="selectedTag"
      clearable
      class="my-cascader"
      @change="handleChange"
    ></el-cascader>

    <div class="tag-box">
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        :type="tag.type"
        class="tag-item"
      >
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTag: [],
      options: [
        {
          value: "group1",
          label: "分组一",
          children: [
            {
              value: "member1",
              label: "员工一",
            },
            {
              value: "member2",
              label: "员工二",
            },
          ],
        },
        {
          value: "group2",
          label: "分组二",
          children: [
            {
              value: "member3",
              label: "员工三",
            },
            {
              value: "member4",
              label: "员工四",
            },
          ],
        },
      ],
      tags: [
        { name: "标签一", type: "" },
        { name: "标签2", type: "" },
        { name: "3", type: "" },
        { name: "标签sadfasdfasdfasd一", type: "" },
        { name: "34", type: "" },
      ],
    };
  },
  methods: {
    handleChange() {
      console.log(this.selectedTag);
    },
  },
};
</script>

<style scoped lang="scss">
.tag-box {
  border: 1px solid red;
  margin-left: 400px;
  width: 500px;
  height: 100px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .tag-item {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
