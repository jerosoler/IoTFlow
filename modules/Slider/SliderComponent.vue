<template>
  <el-slider v-model="value" :min="min" :max="max"></el-slider>
</template>

<script>
  export default {
    data() {
      return {
        value: 1,
        min: 0,
        max: 2
      }
    }
  };
</script>
