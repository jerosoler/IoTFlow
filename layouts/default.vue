<template>
  <div>
    <el-container>
      <el-header><navmenu/></el-header>
      <el-main><nuxt/></el-main>
    </el-container>
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js'
import Navmenu from '~/components/Navmenu.vue'

export default {
  components: {
    Navmenu
  },
  mounted() {
    var that = this;
    socket.on('BoardConnect', function(data) {
      that.$notify({
          title: 'Board Connect',
          message: 'Board name: '+ data.data,
          type: 'success'
        });
    })
  }
}




</script>

<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  -webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-o-user-select: none;
user-select: none;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
body {
  /*overflow: hidden;*/
}

.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}
.el-aside {
  width: auto !important;
  border-right: 1px solid #cacaca;
  min-height: 100vh;
}
.el-main {
  padding: 0px;
  height: calc(100% - 57px);

}

.el-header {
  padding: 0px;
  height: 56px !important;
}


.el-card__header {
  background: #409eff;
color: white;
font-weight: bold;
font-size: 14px;
padding: 10px;
}

/*
.rete .el-collapse-item [role=tabpanel] > div {

  padding-bottom: 0px;

}
.rete .el-collapse-item__wrap {
  overflow: initial;

} */
.rete .el-collapse-item__header {
  background: #e6e6e6;
  height: 35px;
  line-height: 35px;
  font-weight: bold;
  /*clear:both;
  overflow: initial;*/
}
.rete .el-collapse-item [role=tabpanel] {
  width: 100%;
}

.rete .el-collapse-item__arrow {
  position: relative;
  height: 20px;
  top: -6px;
  display:block;
  transition: none !important;

}
.rete .el-collapse-item__arrow:before {
  position:relative;
  top:0px;
}
.rete .el-collapse-item__arrow.is-active:before {
  position:relative;
  left: 7px;
  top: -20px;


}
.rete .deviceslist {
  clear:both;
}
.rete .searchdevices .el-input__inner {
  border-radius: 0px;
}
.rete .el-collapse-item__content {
  padding-bottom: 0px;
}
</style>
