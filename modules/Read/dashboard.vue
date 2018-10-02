<template>
  <div class="toggle">
        {{title}}
    <div class="right">
        <span v-html="value"></span>
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


</style>

<script>
import socket from '~/plugins/socket.io.js'
import axios from 'axios'
var command;

export default {
  data() {
    return {
      value: ''
    }
  },
  props: ['title','dataid'],
  created: function() {
    var that = this;
    socket.on('read'+this.dataid, function(data){
        that.value = data;
    });
  }
}
</script>
