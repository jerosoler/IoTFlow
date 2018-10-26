<template>
  <div class="slider">
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
        <el-slider v-model="value"  @change="button(value, dataid)"  :min="datos.min" :max="datos.max"></el-slider>
        <div :data-voice="titlevoice +` min`" @click="button(datos.min, dataid)"></div>
        <div :data-voice="titlevoice +` max`" @click="button(datos.max, dataid)"></div>
        <div :data-voice="titlevoice +` `+ datos.min" @click="button(datos.min, dataid)"></div>
        <div :data-voice="titlevoice +` `+ datos.max" @click="button(datos.max, dataid)"></div>
  </div>
</template>

<style scoped>
.slider {
  padding: 10px;
  display: inline-block;
  float:left;
  width: 100%;
}
.el-slider{
  float:right;
  width: 25%;
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
    value: 0,
    datavoice: '',
    titlevoice: ''
    }
  },
  props: ['title','dataid', 'datos'],
  created: function() {
    /*
      command = "start"+this.$props.dataid;
      this.commandsend(command); */
  },
  watch: {
    'value': function() {
      socket.emit('command', {command:"read"+this.$props.dataid, data: this.value});
      //socket.emit('command', {command:"status"+this.$props.dataid, data: this.value});
    }
  },
  methods: {
    button(valor,id) {
    //  socket.emit('command', {command:"read"+id, data: valor});
      socket.emit('command', {command:"status"+id, data: valor});
      this.value = valor;
    },


  },
  mounted() {
    var that = this;
    this.titlevoice = this.$props.title.toLowerCase();
    this.datavoice = this.titlevoice + ' [' +this.$props.datos.min +', min]<br>' +  this.titlevoice + ' [' +this.$props.datos.max+', max]';
    socket.on('statusread'+this.$props.dataid, function(data) {
      that.value = data;
    })
    socket.emit('statusid', {id: this.$props.dataid}, function(data) {
      if(data == "") {
        that.value = 0;
      } else {
        that.value = data;
      }
    });

  }
}
</script>
