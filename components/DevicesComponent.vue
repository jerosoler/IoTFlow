<template>
  <div>

    <el-input class="searchdevices" placeholder="Search" v-model="input" suffix-icon="el-icon-search" ></el-input>
    <div v-for="(dato, index) in categories" :key="index">
      <el-collapse   v-model="activeName" class="devices" >
        <el-collapse-item :title="dato" class="deviceslist" :name="index">
        <div v-for="(data, index) in componentssearch" :key="index">
          <div v-if="dato == data.elementtype">

            <div class="draggable" draggable="true" @dragstart="onDrag" :data="data.name">
              <div v-if="data.elementinput">
                <div class="input"></div>
              </div>
              <div v-if="data.elementoutput">
                <div class="output"></div>
              </div>
              <div class="element"  :style="{ background: data.elementcolor }" >
                <div class="name">{{data.elementname}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse >
    </div>
  </div>



</template>
<script>


export default {
  async asyncData ({ app }) {

    data = await removeDuplicates(this.components);

    return { categories : data }
  },
  props: ['components'],
  data() {
      return {
        categories: [],
        activeName: [],
        activeName2: [],
        input: '',
        componentssearch: []
      }
  },
  watch: {
    'input': function() {
      if(this.input == "") {
         this.componentssearch = this.components;
      } else {
         this.componentssearch = this.components.filter(this.filtertext);
      }
      this.activeName = this.activeName2;
    }
  },
  methods: {
    filtertext(dev){
      var t = dev.name.toLowerCase().indexOf(this.input.toLowerCase());
      if(t >= 0) {
        return dev;
      }
    },
    onDrag(e) {
      e.dataTransfer.setData("text", e.target.getAttribute("data"));

      var crt = e.target.cloneNode(true);

   crt.style.position = "relative"; crt.style.top = "0px"; crt.style.right = "0px";
   crt.style.width = '164px';
   crt.style.fontSize = '13px';
   document.getElementById("backupelement").appendChild(crt);
   e.dataTransfer.setDragImage(crt, 0, 0);
    },
    removeDuplicates(arr){
      var that = this;
      setTimeout(function() {
        let unique_array = []
        let number_array = []
        var z = 0;
        for(let i = 0;i < arr.length; i++){

            if(unique_array.indexOf(arr[i].elementtype) == -1){
              unique_array.push(arr[i].elementtype)

              number_array.push(z);
              z++;
            }
        }
        that.activeName = number_array;
        that.activeName2 = number_array;
        that.categories = unique_array.sort();
        }, 100);


    },
  },

  mounted() {
      this.componentssearch = this.components;
     this.removeDuplicates(this.components);
  }
}

</script>
<style scoped>

.draggable {
  background: transparent !important;
  cursor:move;
}
.element {
  display: block;
  max-width: 100%;
  margin: 7px;
  height:35px;
  border-radius: 4px;
  border: 2px solid black;
  background: transparent;
  text-align:center;
  text-indent: 0px;
}
.image {
  display: block;
  float: left;
  width: 20%;
  max-height: 100%;
  vertical-align: middle;
  background-size: contain !important;
    background-position: 50% 50% !important;
  height: 31px;
  border-right: 2px solid black;
}
.name {
  display: block;
  text-align: center;
  width: 100%;
  position: relative;
  line-height: 31px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  font-weight: bold;
}
.input {
  width: 15px;
  height:15px;
  position: relative;
  float: left;
  display: block;
  background: white;
  border-radius: 50%;
  border:2px solid black;
  left: 2px;
  top: 10px;
}
.output {
  width: 15px;
  height:15px;
  position: relative;
  float: right;
  display: block;
  background: white;
  border-radius: 50%;
  border:2px solid black;
  right: 2px;
  top: 10px;
}
.el-collapse-item {
  text-indent: 15px;
}




</style>
