<template>
  <div class="about">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>关于</span>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>
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
          <div class="text item">
            打开支付宝打赏2块钱，帮我买杯咖啡，继续码代码，谢谢大家！
          </div>
          <div class="text item block">
            <el-image src="./alipay.jpg"></el-image>
          </div>
          <div class="text item">听说，打赏我的人最后都找到了真爱。 </div>
            <div class="text item">听说打赏我的人，都进了福布斯排行榜 </div>
              <div class="text item">打赏的都是天使。 </div>
                <div class="text item">打赏了的人都会变美~ </div>
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
