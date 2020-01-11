<template>
  <el-container>
    <el-aside width="300px">
      <label>{{province}}</label>
      <div>
        <el-checkbox-group v-model="checkCityList" @change="checkCityChange" size="mini">
          <el-checkbox-button
            v-for="item in cityList"
            :key="item.name"
            :label="item"
            size="mini"
          >{{item.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </el-aside>
    <el-main>
      <e-china-and-city :geoCoordMapCheck="checkCityList" @clickProvince="getProvince"></e-china-and-city>
      <div></div>
    </el-main>
  </el-container>
</template>

<script>
import EChinaAndCity from "../components/EChinaAndCity";
export default {
  name: "MapCountryCity",
  data() {
    return {
      province: "点击地图上的省份选择城市",
      geoCoordMap: [],
      cityList: [],
      checkCityList: [] //选择的城市
    };
  },
  components: {
    EChinaAndCity
  },
  methods: {
    //根据子组件传递过来的省份,加载改省份的城市
    getProvince(val) {
      this.province = val;
      this.geoCoordMap.map(item => {
        if (item.name === val) {
          this.cityList = this.sortByKey(item.children,'name');
        }
      });
      this.cityList.forEach(item=>{
          item.value=1
      })

      // console.log('省份加载城市列表',this.cityList);
    },
    checkCityChange() {
      console.log("checkCityChange", this.checkCityList);
    },
    //数组对象方法排序:
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  },
  mounted() {
    this.$axios.get("geoCoordMap.json", {}).then(res => {
      this.geoCoordMap = res.data;
      // console.log('加载城市经纬度',this.geoCoordMap)
    });
  }
};
</script>
<style>
.el-aside,
.el-main {
  background-color: #fff;
  color: rgb(14, 121, 221);
  text-align: left;
  line-height: 30px;
}
</style>
