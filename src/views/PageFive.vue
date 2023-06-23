<template>
  <div>
    <input type="file" accept="image/gif" @change="handleFileUpload" />
    <el-slider v-model="scale" :min="0.1" :max="2" :step="0.1"></el-slider>
    <el-button @click="resizeGif">调整尺寸</el-button>
    <img
      id="myImages"
      v-if="gifData"
      :src="gifData"
      :style="{ transform: 'scale(' + scale + ')' }"
      alt="Uploaded GIF"
    />
    <img id="gifs" src="" alt="GIF" style="height: 100px; width: 100px" />
  </div>
</template>

<script>
// import GIF from "gif.js";

export default {
  data() {
    return {
      gifData: null,
      scale: 1,
      secondFrameData: null, // 添加变量用于存储第二帧的图像数据
    };
  },
  computed: {},

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;
        this.gifData = reader.result;
      };
    },
    resizeGif() {
      //eslint-disable-next-line
      const gif = new GIF({
        workers: 2,
        quality: 10,
      });

      // 使用 gif.js 添加原始 GIF 图像帧
      const pic = document.getElementById("myImages");
      console.log(pic);
      gif.addFrame(pic, { copy: true });

      // 渲染GIF
      gif.on("finished", function (blob) {
        // 将生成的GIF图像显示在<img>元素中
        var img = document.getElementById("gifs");
        img.src = URL.createObjectURL(blob);
      });

      // 开始生成GIF
      gif.render();
    },
  },
};
</script>
