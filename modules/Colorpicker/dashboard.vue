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
        <el-color-picker @change="button(value,dataid)" v-model="value"></el-color-picker>
        <div :data-voice="titlevoice +` red`" @click="button('#ff0000', dataid)"></div>
        <div :data-voice="titlevoice +` blue`" @click="button('#0000ff', dataid)"></div>
        <div :data-voice="titlevoice +` green`" @click="button('#008000', dataid)"></div>
        <div :data-voice="titlevoice +` white`" @click="button('#FFFFFF', dataid)"></div>
        <div :data-voice="titlevoice +` black`" @click="button('#000000', dataid)"></div>
        <div :data-voice="titlevoice +` yellow`" @click="button('#ffff00', dataid)"></div>
        <div :data-voice="titlevoice +` chocolate`" @click="button('#d2691e', dataid)"></div>
        <div :data-voice="titlevoice +` pink`" @click="button('#ffc0cb', dataid)"></div>
  </div>
</template>

<style scoped>
.button {
  padding: 10px;
  display: inline-block;
  float:left;
  width: 100%;
}
.el-color-picker {
  float:right;
  margin-right: 10px;
}



</style>

<script>
import socket from '~/plugins/socket.io.js'

export default {

  data: function() {
    return {
    value: null,
    datavoice: '',
    titlevoice: ''

    }
  },
    props: ['title','dataid'],
  created: function() {

  },
  methods: {
    button(valor,id) {
      console.log(valor);
      socket.emit('command', {command:"read"+id, data: valor});
      socket.emit('command', {command:"status"+id, data: valor});
      this.value = valor;
    },
  },
  mounted() {
    var that = this;
    this.titlevoice = this.$props.title.toLowerCase();
    this.datavoice = this.titlevoice + ' [red, green, blue, white, black, yellow, chocolate, pink]';
    socket.on('statusread'+this.$props.dataid, function(data) {
      that.value = data;
    })
    socket.emit('statusid', {id: this.$props.dataid}, function(data) {
      that.value = data;
    });
  }
}
</script>
