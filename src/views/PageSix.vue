<template>
  <div>
    <input type="file" @change="handleImageChange" />
    <img :src="imgUrl" id="myImages" class="img" />
  </div>
</template>

<script>
import GIF from "gif.js";

export default {
  data() {
    return {
      scale: 1,
      imgUrl: null,
      canvasWidth: 800,
      canvasHeight: 600,
    };
  },
  methods: {
    handleImageChange(event) {
      this.imgUrl = URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>
<style>
.img {
}
</style>
