<template>
  <div class="box">
    <input type="file" accept="image/gif" @change="handleFileUpload" />
    <img
      :src="imgURL"
      :style="{ transform: `scale(${scale})` }"
      alt=""
      style="max-width: 100vw"
    />
    <el-slider
      v-model="scale"
      :min="0.1"
      :max="1"
      :step="0.1"
      style="width: 80vw"
    ></el-slider>
    <button @click="mountFile">开始渲染</button>
  </div>
</template>

<script>
import GIF from "gif.js";
//eslint-disable-next-line
import { decompressFrames, parseGIF } from "gifuct-js";

export default {
  data() {
    return {
      scale: 1,
      imgUint8Array: null,
      picsList: [],
      file: null,
      imgURL: null,
      result: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imgURL = event.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    mountFile() {
      this.picsList = [];
      const reader = new FileReader();
      // 将文件读取为二进制数据
      reader.readAsArrayBuffer(this.file);
      reader.onload = () => {
        this.imgUint8Array = new Uint8Array(reader.result);
        this.startRendering();
      };
    },
    startRendering() {
      const gif = parseGIF(this.imgUint8Array);
      const frames = decompressFrames(gif, true);
      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const canvas = document.createElement("canvas");
        canvas.width = frame.dims.width;
        canvas.height = frame.dims.height;
        const context = canvas.getContext("2d");
        const imageData = context.createImageData(
          frame.dims.width,
          frame.dims.height
        );
        imageData.data.set(frame.patch);
        context.putImageData(imageData, 0, 0);

        // 对Canvas进行等比例缩小
        const scaledCanvas = document.createElement("canvas");
        const scaleRatio = this.scale; // 缩放比例为0.5
        scaledCanvas.width = canvas.width * scaleRatio;
        scaledCanvas.height = canvas.height * scaleRatio;
        const scaledContext = scaledCanvas.getContext("2d");
        scaledContext.drawImage(
          canvas,
          0,
          0,
          scaledCanvas.width,
          scaledCanvas.height
        );

        const image = new Image();
        image.src = scaledCanvas.toDataURL();
        this.picsList.push(image);
        // document.body.appendChild(image);
      }
      setTimeout(() => {
        this.transToGif();
      }, 100);
    },
    transToGif() {
      //eslint-disable-next-line
      const gif = new GIF({
        workers: 2,
        quality: 10,
      });

      for (let i = 0; i < this.picsList.length; i++) {
        gif.addFrame(this.picsList[i], { delay: 100 });
      }
      this.result = true;
      // 渲染GIF
      gif.on("finished", function (blob) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
      });

      // 开始生成GIF
      gif.render();
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
