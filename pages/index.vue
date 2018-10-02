<template>
  <section class="container">
    <div v-for="(data, index) in datos.Home.data.nodes" :key="index" >
      <div v-if="modulesavaible.indexOf(data.name) > -1">
        <component :is="data.name" :title="data.data.msg" :dataid="data.id" :datos="data.data"></component>
      </div>
    </div>

    <div style="clear:both;"></div>

    <el-collapse accordion>
      <el-collapse-item  v-for="(data, index) in datos" v-if="index != 'Home'" :key="index" :title="index" :name="index">
          <div v-for="(data, index) in data.data.nodes" :key="index" >
            <div v-if="modulesavaible.indexOf(data.name) > -1">
              <component :is="data.name" :title="data.data.msg" :dataid="data.id" :datos="data.data"></component>
            </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <voice></voice>
  </section>
</template>



<script>



import axios from 'axios'


var components = {
  Voice: ()=> import('~/components/Voice.vue'),

}

var modulesavaible = [];
const req = require.context('~/modules/', true, /dashboard.vue$/);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  modulesavaible.push(name);
  components[name] = ()=> import('~/modules/'+name+'/dashboard.vue');
});




var command;
export default {
  async asyncData ({ app }) {
    //data = await axios.get('http://127.0.0.1:3000/importflow')
    const datos = await app.$axios.$get('importflow')
    return { datos, modulesavaible }
    //return {datos: data.data}
  },
  components,
  /*components: {
    Buttonio,  Voice
  },*/
  methods: {
    button(valor,id) {
      //alert("VALOR:"+valor + " - " +id);
      command = "";
      if(valor === true) {
        command = "on"+id;
      } else {
        command = "off"+id;
      }
      this.commandsend(command);
      console.log(command);
    },
    commandsend(command) {
     axios.post('command', { command:command })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style>
.container {
  padding: 0px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.fa-microphone {
  cursor: pointer;
}

</style>

<style scoped>
.container {
  font-size: 12px;
}
.el-collapse {
      overflow: hidden;
}
.el-collapse-item {
  text-indent: 15px;
}
.el-collapse-item div {
  text-indent: 0px;
}

</style>
