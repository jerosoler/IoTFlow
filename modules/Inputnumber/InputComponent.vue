<template>
  <el-input-number class="numbertext" placeholder="Text" v-model="input" size="mini"></el-input-number>
</template>

<script>
  export default {
    data() {
      return {
        input: 'Text'
      }
    }
  };
</script>

<style scoped>
.numbertext {
  width: 57px;
}
.numbertext input {
  padding: 0px;
}

</style>
