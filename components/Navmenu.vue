<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <nuxt-link to="/" >
      <el-menu-item index="1">
        <img src="logo.png" height="30px;">
        <span slot="title" style="padding-left: 5px;">IoTFlow</span>
      </el-menu-item>
    </nuxt-link>


      <nuxt-link to="/flow" >
      <el-menu-item index="2">
          <i class="fa fa-edit fa-2x" style="color:#ff9900;margin-right: 5px;"></i>
        <span slot="title">Flow</span>
      </el-menu-item>
    </nuxt-link>

      <nuxt-link to="/settings" >
    <el-menu-item index="3">
      <i class="fa fa-cogs fa-2x" style="color:#8e8080;margin-right: 5px;"></i>
      <span slot="title">Settings</span>
    </el-menu-item>
  </nuxt-link>
</el-menu>
</template>


<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      }
    },
    mounted() {
      switch (this.$nuxt._route.name) {
        case 'index':
          this.activeIndex = '1';
          break;
        case 'flow':
          this.activeIndex = '2';
          break;
        case 'settings':
          this.activeIndex = '3';
          break;
        default:

      }
    }

  }
</script>

<style>
.el-menu {
  background: black;
  color: white;
}
.el-menu-item {
  width: 33.33%;
  text-align: center;
  float:left;
  color: white;
}
</style>
