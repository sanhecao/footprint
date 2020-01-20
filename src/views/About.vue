<template>
  <div class="about">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>关于</span>
            <el-button style="float: right; padding: 3px 0" type="text">打赏</el-button>
          </div>
          <div class="text item">

            <el-link icon="el-icon-star-on" href="https://github.com/sanhecao/footprint" type="primary">
              GitGub源码地址:https://github.com/sanhecao/footprint
            </el-link>
          </div>
          <div class="text item">
            <el-rate
                    v-model="starLike"
                    show-text>
            </el-rate>
          </div>
        </el-card>
      </el-col>
      </el-row>
  </div>
</template>
<script>
  export default {
    name:'about',
    data() {
      return {
        starLike:null

     }
    }
  }
</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
</style>
