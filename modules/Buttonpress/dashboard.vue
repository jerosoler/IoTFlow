<template>
  <div class="button">
        {{ title }}
        <el-button type="primary"  v-on:mouseover="button(true, dataid)" @mouseup="button(false,dataid)" circle></el-button>

  </div>
</template>

<style scoped>
.button {
  padding: 10px;
  display: inline-block;
  float:left;
  width: 100%;
}
.el-button {
  float:right;
  margin-right: 10px;
  padding: 20px;
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
    }
  },
  props: ['title','dataid'],
  created: function() {

  },
  methods: {
    button(valor) {
      socket.emit('command', {command:"read"+this.$props.dataid, data: valor});
      //socket.emit('command', {command:"status"+id, data: valor});
    },
  },
  mounted() {
    var that = this;
   this.$el.children[0].addEventListener('mousedown', function(){
      that.button(true);
   });
   this.$el.children[0].addEventListener('touchstart', function(){
      that.button(true);
   });
   this.$el.children[0].addEventListener('mouseup', function(){
      that.button(false);
   });
   this.$el.children[0].addEventListener('touchend', function(){
      that.button(false);
   });
 }

}
</script>
