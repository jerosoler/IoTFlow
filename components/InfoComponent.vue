<template>
  <el-popover
    placement="bottom"
    trigger="click"
    :title="title"
    model="false">
    <div v-html="data"></div>
    <div class="number">ID: {{id}}</div>
    <i slot="reference"  class="el-icon-info"></i>
  </el-popover>
</template>

<script>
export default {
  props: ['data', 'title', 'id']
}
</script>
<style scoped>
.el-popover-text {
  min-width: 200px;
}
.el-icon-info {
  color: #ffffff;
  position:relative;
  top: 5px;
}
.number {
  position:absolute;
  top: 10px;
  right: 12px;
  font-weight: bold;
  color: black;
}
</style>
