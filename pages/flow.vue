<template>
  <section class="container rete">

    <div id="column">
      <devicescom :components="components"/>
    </div>


    <div class="right">
    <div al-app id="modules">
       <div v-for="(data, index) in modules" :key="index" >
         <div style="width: 100%; height: 100%; padding: 10px; padding-left: 20px; padding-right: 20px;" class="openmodules"  @click="openModule(index)">
         <div>{{ index }}</div>

        </div>

          <div v-if="index != 'Home'" class="removetab" @click="removeModule(index)">x</div>
       </div>
       <el-button id="addmodule" type="success" icon="el-icon-circle-plus" circle  @click="dialogFormVisible = true"></el-button>


   </div>

    <div id="rete"  @dragover.prevent @drop="onDrop"></div>
    </div>
        <div id="backupelement" ></div>


    <el-button id="save" type="success" icon="el-icon-check" circle @click="save"></el-button>
    <el-dialog title="New sheet" :visible.sync="dialogFormVisible">
     <el-form :model="form">
       <el-form-item label="Name">
         <el-input v-model="form.name" auto-complete="off"></el-input>
       </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">Cancel</el-button>
       <el-button type="primary" @click="addModule(form.name)">Confirm</el-button>
     </span>
   </el-dialog>
  </section>
</template>

<script>
//import axios from 'axios'
import * as VueRenderPlugin from 'rete-vue-render-plugin';
import Devicescom from '~/components/DevicesComponent.vue' ;



function drop(ev) {
    ev.preventDefault();
}


var editor, data;
var [x, y] = [0,0];
var components = [];
var initialData = () => ({id: 'demo@0.1.0', nodes: {}});

var currentModule = {};
export default {
  components: {
    Devicescom
  },
  async asyncData ({ app }) {

    const datos = await app.$axios.$get('importflow')

    return { datos, modules: datos }
  },
  data() {
    return {
      dialogFormVisible: false,
       form: {
         name: ''
       },
       components: []
    }
  },
  methods: {
    onDrag(e) {
      e.dataTransfer.setData("text", e.target.getAttribute("data"));

    },
    async onDrop(e) {
      document.getElementById("backupelement").innerHTML = "";
        e.stopPropagation();
        e.preventDefault();
        //console.log(e);
        /*var files = e.dataTransfer.files;
        this.createFile(files[0]);*/
        var d;
        var data = e.dataTransfer.getData("text");
        this.components.map(c => {
          //console.log(c.name);
            if(c.name == data) {
              d = c;
            }
        });


        const node = await d.createNode();
        var positionx = e.x - e.offsetX - e.layerX;
        var positiony = e.y - e.offsetY  - e.layerY;

        setTimeout(function(){
        node.position[0] = x;
        node.position[1] = y;

        editor.addNode(node);
      },25);
/*
          node.position[0] = x;
          node.position[1] = y;
          this.editor.addNode(node);*/
      },
  save() {

    currentModule.data = editor.toJSON();
    editor.trigger('process')
    this.$axios.$post('saveflow', {
        datos: this.modules,
      }).then(function (response) {

      })

      this.$message({
        type: 'success',
        message: 'Uploading!!!'
      });
    },
    async removeModule(index) {


      this.$confirm('Are you sure to erase?', {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      //console.log(index);
      document.getElementsByClassName("openmodules")[0].click();
      var test = this.modules;
      delete test[index];
      this.modules = '';
      this.modules = test;

      this.$message({
        type: 'success',
        message: 'Complete deletion must save the changes'
      });
    }).catch(() => {

    });


    },
    addModule(name) {
        //console.log("moduleadd");
        this.dialogFormVisible = false;
        this.modules[name] =  { data: initialData() };

        var test = this.modules;
        this.modules = '';
        this.modules = test;
        this.form.name = '';
    },
    async openModule(name) {
      //console.log(event);
      var x = document.getElementsByClassName("openmodules");
      for (var i = 0; i < x.length; i++) {

        x[i].style.background = "white";
      }
      if(event.target.className == "openmodules") {
        event.target.style.background = "#8b9fff";
      } else {
        event.target.parentElement.style.background = "#8b9fff";
      }


      currentModule.data = editor.toJSON();
     currentModule = this.modules[name];
     await editor.fromJSON(currentModule.data);
//     AreaPlugin.zoomAt(editor);

     editor.trigger('process')

    }
  },
  mounted() {
    var that = this;
    data = this.datos;




      const TextControl = require('~/assets/js/flows/TextControl.js').default;



    var loadmodules = require.context('~/modules', true, /flow\.js$/);

    var modulesload = [];
    loadmodules.keys().forEach(function(a,i) {

      a = a.replace('./','');
      a = a.replace('/flow.js','');



      modulesload[i] = require('~/modules/'+a+'/flow.js').default;

    });

    var loadmodulesstyle = require.context('~/modules', true, /flowstyle\.css$/);
    loadmodulesstyle.keys().forEach(function(a,i) {

      a = a.replace('./','');
      a = a.replace('/flowstyle.css','');
      require('~/modules/'+a+'/flowstyle.css');
    });




    (async () => {
        var container = document.querySelector('#rete');

        //var components = [new NumComponent(), new AddComponent(), new PinElementComponent(), new ButtonComponent(), new LedComponent()];


        modulesload.forEach(function(a) {
          that.components.push(new a());
          //console.log(b);
        })


        editor = new Rete.NodeEditor('demo@0.1.0', container);
        editor.use(VueRenderPlugin);

        editor.use(ConnectionPlugin, { curvature: 0.4 });

        //editor.use(AlightRenderPlugin);


        editor.use(ContextMenuPlugin);

        editor.use(AreaPlugin);



        var engine = new Rete.Engine('demo@0.1.0');
        editor.use(ModulePlugin, { engine, modules });

        that.components.map(c => {
            //console.log(c);
            editor.register(c);
            engine.register(c);
        });

        editor.on("process connectioncreated connectionremoved", async () => {
           if(editor.silent) return;

           await engine.abort();
           await engine.process(editor.toJSON());
        });

        editor.on('mousemove', ({ e, view } ) => {
        [x, y] = [editor.view.area.mouse.x, editor.view.area.mouse.y];
        });




        /*
        editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
            await engine.abort();
            await engine.process(editor.toJSON());

            //console.log(editor.toJSON());
        });*/
        //console.log(data);
        //await editor.fromJSON(data);

      //  await editor.fromJSON(data);


      editor.view.resize();
      //AreaPlugin.zoomAt(editor);

      editor.trigger('process');
      this.components = that.components;
    })();

     document.getElementsByClassName("openmodules")[0].click();
    /*
    for(data in data); {
      this.openModule(data);
    }
    */

  //  console.log(data[0]);
  }
}



</script>

<style scoped>
.container {
  height: calc(100vh - 57px);
  overflow: hidden;
}
.container, #rete {
  background: white;
  max-height: 100vh;
  z-index: 2;
}
.right {
  float: right;
  display: block;
  height: calc(100vh - 96px) !important;
  width: calc(100vw - 180px) !important;
  min-width: calc(100vw - 180px) !important;
}
#backupelement {
  position:absolute;
  position: absolute;
  top: 0px;
  left: -99999px;
  width: 180px; height: 90px; display:block;

  z-index: 1;
}
/*
#rete {
  display:block;
  height: calc(100vh - 96px) !important;
  width: calc(100vw - 180px) !important;
  min-width: calc(100vw - 180px) !important;
  float:right;
}*/

#column {
  display: inline-block;
  height: calc(100vh - 56px) !important;
  width: 180px;
  border-right: 1px solid #e6e6e6;
  overflow-y: scroll;
  overflow-x: hidden;

}
.container {
  padding: 0px;
}
#save {
  position:absolute;
  right: 20px;
  top: 110px;
}
.removetab {
  position: absolute;
  top: 0px;
  right: 0px;
  background: red;
  color: white;
  border-radius: 0px 0px 2px 2px;
  font-weight: bold;
  width: 15px;
  height:15px;
  line-height: 14px;
  text-align: center;
  display: none;
}
#modules, #rete {
  width: 100% !important;
  display:flex;
}

#modules  {
  overflow-x: auto;
  border-bottom: solid 1px #e6e6e6;
  /*float:left;
  width: calc(100vw - 180px) !important;
  overflow-x: auto;
  display:flex
  */
}

#modules > div {
  display: inline-block;
  cursor:pointer;
  border-right: 1px solid #e6e6e6;
  position: relative;
}

#modules > div:hover .removetab {
  display:block;
}
#addmodule {
  font-size: 20px;
padding: 5px;
margin-left: 10px;
margin-right: 10px;
position: relative;
width: 31px;
height: 31px;
top: 3px;
}
.openmodules {
  padding-left: 20px;
}

.context-menu .item:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.context-menu .item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.context-menu .search input {
  border-radius: 4px;
}





</style>

<style>
body {
  overflow-x: hidden;
}
#rete {
  cursor:crosshair;
}
#rete .node {
  cursor:move;
}
#rete .node .el-icon-info {
  cursor:pointer;
}
.node, .node input, .node select   {
  border-radius: 4px !important;
}

.node select[name=boards] {
  width: 50px !important;
}
/*#rete {
  position:absolute;
  top: 96px;
  left: 180px;
}*/

#rete .socket {
  border: 2px solid black;
  background: white;
}

#rete .connection path {
      stroke: rgba(0, 0, 0, 0.6);
}

.el-popover {
  min-width: 200px;
}
.el-popover__title {
  border-bottom: 2px solid black;
  font-weight: bold;
}

.context-menu .item,  .context-menu .search.item {
  min-width: 160px;
  border: 1px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  background: rgba(255, 255, 255, 0.9);
  color:black;
}
.context-menu .search.item input {
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  font-weight: bold;
}
.context-menu .search.item:hover input {
  color: white;
  border: 1px solid white;
}

.context-menu .item:hover {
  background-color: rgba(0,0,0,0.9);
  color: white;
}
.context-menu .item:first-child {
  border-top: 2px solid black;
}
.context-menu .item:last-child {
  border-bottom: 2px solid black;
}




</style>
