<template>
  <el-select v-model="value" placeholder="Board" @change="update()" size="small">
   <el-option
     v-for="item in values"
     :key="item.name"
     :label="item.name"
     :value="item.name">
   </el-option>
 </el-select>
</template>

<script>
export default {
  props: ['readonly', 'emitter', 'ikey', 'type', 'placeholder', 'that'],
  data() {
      return {
        values: '',
        value: ''
      }
  },
  methods: {
       update() {
          if (this.ikey)
            this.that.putData(this.ikey, this.value)
            this.that.emitter.trigger('process');
      },
      async refreshlist () {
          var boards = await fetch('listboards')
          .then(function(response) { return response.json(); })
          .then(function(data) {
            return data;
          })
          this.values = boards
      }

  },
  mounted() {
    this.refreshlist();
    this.value = this.that.getData(this.ikey);
  }
}



</script>
<style scoped>
.el-icon-info {
  color: #5a5ae2;
  position:relative;
  top: 5px;
}
</style>


});
