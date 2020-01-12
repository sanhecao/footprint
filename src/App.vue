<template>
  <div id="app">
    
    
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item>
       <el-avatar> hqp </el-avatar>
        </el-menu-item>
      <el-menu-item index="/">中国地图</el-menu-item>
      <el-menu-item index="/about">世界地图</el-menu-item>
      <el-menu-item index="/map">中国城市足迹</el-menu-item>
    
    </el-menu> 
    <router-view/>
     <!-- <el-menu-item index="1"><router-link to="/"  target="_blank">中国</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/about">世界地图</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/map">中国城市足迹</router-link></el-menu-item>
     -->
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
