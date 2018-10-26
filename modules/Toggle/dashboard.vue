<template>
  <div class="toggle">
    <el-popover
    placement="top-start"
    title="Mic"
    width="200"
    trigger="click"
    >
    <div v-html="datavoice"></div>
    <i slot="reference" class="fa fa-microphone" aria-hidden="true"></i>
  </el-popover>
        {{title}}
      <el-button type="primary" size="mini" @click="button(dataid)" :data-voice="titlevoice">Toggle</el-button>
  </div>
</template>

<style scoped>
.toggle {
  padding: 10px;
  display: inline-block;
  float:left;
  width: 100%;
}
.el-button {
  float:right;
  margin-right: 10px;
}



</style>

<script>
import socket from '~/plugins/socket.io.js'
import axios from 'axios'
var command;

export default {
  data: function() {
    return {
    datavoice: '',
    titlevoice: ''
    }
  },
  props: ['title','dataid'],
  created: function() {

  },
  methods: {
    button(id) {
      socket.emit('command', {command:"read"+id, data: "toggle"});
    },

  },
  mounted() {
    this.titlevoice = this.$props.title.toLowerCase();
    this.datavoice = this.titlevoice + ' (toggle)';
  }
}
</script>
