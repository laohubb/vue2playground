<template>
  <div>
    <input type="file" @change="handleImageChange" />
    <canvas ref="canvas"></canvas>
    <button @click="compressImage">压缩图片</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scale: 1,
      selectedImage: null,
      canvasWidth: 800,
      canvasHeight: 600,
    };
  },
  methods: {
    handleImageChange(event) {
      this.selectedImage = event.target.files[0];
    },
    compressImage() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          const ratio = Math.min(
            this.canvasWidth / width,
            this.canvasHeight / height
          );

          width *= ratio;
          height *= ratio;

          canvas.width = width;
          canvas.height = height;

          context.clearRect(0, 0, width, height);
          context.drawImage(img, 0, 0, width, height);

          const compressedImageData = canvas.toDataURL("image/jpeg", 0.2);

          // 在此处将压缩后的图像数据上传到服务器或其他操作
          console.log(compressedImageData);
        };

        img.src = event.target.result;
      };

      reader.readAsDataURL(this.selectedImage);
    },
  },
};
</script>
