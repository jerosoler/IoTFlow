<template>
  <div class="toggle">
        {{title}}
    <div class="right">
      <el-input placeholder="Please input" v-model="input"  size="mini"></el-input>
      <el-button type="primary" size="mini" @click="button(dataid, input)">Send</el-button>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  margin: 10px;
  display: inline-block;
  float:left;
  width: 100%;
}
.right {
  float:right;
  margin-right: 20px;
}

.right .el-input {
  width: 150px;
  margin-right: 10px;
}



</style>

<script>
import socket from '~/plugins/socket.io.js'
import axios from 'axios'
var command;

export default {
  data() {
    return {
      input: ''
    }
  },
  props: ['title','dataid'],
  created: function() {

  },
  methods: {
    button(id,data) {
      socket.emit('command', {command:"read"+id, data: data});
      this.input = '';
    },

  }
}
</script>
