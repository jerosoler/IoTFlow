<template>
  <div class="button">
        <el-popover
        placement="top-start"
        title="Mic"
        width="200"
        trigger="click"
        >
        <div v-html="datavoice"></div>
        <i slot="reference" class="fa fa-microphone" aria-hidden="true"></i>
      </el-popover>
        {{ title }}
        <el-switch  active-color="#13ce66"  inactive-color="#ff4949" v-model="value" :data-voice="titlevoice" @change="button(value, dataid)"></el-switch>
        <div :data-voice="titlevoice +` on`" @click="button(true, dataid)"></div>
        <div :data-voice="titlevoice +` off`" @click="button(false, dataid)"></div>
  </div>
</template>

<style scoped>
.button {
  padding: 10px;
  display: inline-block;
  float:left;
  width: 100%;
}
.el-switch {
  float:right;
  top: 5px;
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
    value: false,
    datavoice: '',
    titlevoice: ''
    }
  },
  props: ['title','dataid'],
  created: function() {

  },
  methods: {
    button(valor,id) {
      socket.emit('command', {command:"read"+id, data: valor});
      socket.emit('command', {command:"status"+id, data: valor});
      this.value = valor;
    },
  },
  mounted() {
    var that = this;
    this.titlevoice = this.$props.title.toLowerCase();
    this.datavoice = this.titlevoice + ' (toggle)<br>' + this.titlevoice + ' on<br>' + this.titlevoice + ' off<br>';
    socket.on('statusread'+this.$props.dataid, function(data) {
      that.value = data;
    })
    socket.emit('statusid', {id: this.$props.dataid}, function(data) {
      that.value = data;
    });
  }
}
</script>
