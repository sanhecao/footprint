<template>
  <div class="home">
    <echarts-china></echarts-china>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import EchartsChina from "../components/EchartsChina.vue";
export default {
  name: 'home',
  components: {
    HelloWorld,
    EchartsChina
  }
}
</script>
