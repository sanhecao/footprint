<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item>
       <el-avatar> hqp </el-avatar>
        </el-menu-item>
      <el-menu-item index="/">中国城市足迹</el-menu-item>
      <el-menu-item index="/home">中国地图</el-menu-item>
      <el-menu-item index="/about">世界地图</el-menu-item>

    </el-menu>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeIndex:'/'

    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
